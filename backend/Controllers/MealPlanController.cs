using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    public class MealPlanController : Controller
    {
        private readonly ApplicationDbContext _db;

        public MealPlanController(ApplicationDbContext db)
        {
            _db = db;
        }

        // MealPlan:

        // Creates instance if does not exist (not RESTful)
        [HttpGet("mealplan/{username}/{year}/{month}/{day}")]
        public async Task<ActionResult<MealPlanDTO>> GetMealPlan(string username, int year, int month, int day)
        {
            MealPlan mealPlan = await _db.MealPlans.Where(m => (m.Username==username) && (m.Date.year == year) && (m.Date.month == month) && (m.Date.day == day)).FirstOrDefaultAsync();

            if (mealPlan == null)
            {
                mealPlan = new MealPlan() {
                    Username = username,
                    Date = new Date() { year = year, month = month, day = day }
                };
                _db.MealPlans.Add(mealPlan);
                await _db.SaveChangesAsync();
            }
            
            MealPlanDTO mealPlanDTO = new MealPlanDTO() {
                MealPlanID = mealPlan.MealPlanID,
                Date = mealPlan.Date,
                Breakfast = new List<FoodEntryDTO>(),
                Lunch = new List<FoodEntryDTO>(),
                Dinner = new List<FoodEntryDTO>()};
            List<FoodEntry> foodEntries = await _db.FoodEntries.Where(f => f.MealPlanID == mealPlan.MealPlanID).ToListAsync();

            foreach (var entry in foodEntries)
            {
                FoodItem foodItem = await _db.FoodItems.Where(f => f.FoodID == entry.FoodID).FirstOrDefaultAsync();
                FoodEntryDTO foodEntryDTO = new FoodEntryDTO(){FoodID=foodItem.FoodID, FoodName=foodItem.Name, Amount=entry.Amount, PortionName=entry.PortionName};
                if (entry.Section == "Petit déjeuner")
                    mealPlanDTO.Breakfast.Add(foodEntryDTO);
                else if (entry.Section == "Déjeuner")
                    mealPlanDTO.Lunch.Add(foodEntryDTO);
                else if (entry.Section == "Dîner")
                    mealPlanDTO.Dinner.Add(foodEntryDTO);
            }

            return mealPlanDTO;
        }

        // FoodEntry:

        [HttpPost("foodentry/{mealPlanID}/{section}")]
        public async Task<ActionResult> AddFoodEntry(int mealPlanID, string section, [FromBody] FoodEntryDTO foodEntryDTO)
        {
            MealPlan mealPlan = await _db.MealPlans.Where(m => (m.MealPlanID == mealPlanID)).FirstOrDefaultAsync();
            FoodItem foodItem = await _db.FoodItems.Where(f => f.FoodID == foodEntryDTO.FoodID).FirstOrDefaultAsync();

            if (foodItem == null)
                return BadRequest("FoodID does not correspond to any food item.");

            _db.FoodEntries.Add(new FoodEntry()
            {
                FoodID = foodEntryDTO.FoodID,
                MealPlanID = mealPlanID,
                Section = section,
                Amount = foodEntryDTO.Amount,
                PortionName = foodEntryDTO.PortionName,
            });

            await _db.SaveChangesAsync();
            return Ok();
    }

    }
}
