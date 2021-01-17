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
            }
            
            MealPlanDTO mealPlanDTO = new MealPlanDTO();
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

        [HttpGet("foodentry")]
        public async Task<ActionResult<List<FoodEntry>>> GetFoodEntries()
        {
            return await _db.FoodEntries.AsNoTracking().ToListAsync();
        }

        [HttpGet("foodentry/{id}")]
        public async Task<ActionResult<FoodEntry>> GetFoodEntry(int id)
        {
            FoodEntry foodEntry = await _db.FoodEntries.Where(f => f.FoodEntryID == id).FirstOrDefaultAsync();

            if (foodEntry == null)
                return BadRequest("Food entry does not exist");

            return foodEntry;
        }
    }
}
