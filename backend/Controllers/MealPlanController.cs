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

        [HttpGet("mealplan")]
        public async Task<ActionResult<List<MealPlan>>> GetMealPlans()
        {
            return await _db.MealPlans.AsNoTracking().ToListAsync();
        }

        [HttpGet("mealplan/{id}")]
        public async Task<ActionResult<MealPlan>> GetMealPlan(int id)
        {
            MealPlan mealPlan = await _db.MealPlans.Where(m => m.MealPlanID == id).FirstOrDefaultAsync();

            if (mealPlan == null)
                return BadRequest("Meal plan does not exist");

            return mealPlan;
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
