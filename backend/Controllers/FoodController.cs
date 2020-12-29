using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    public class FoodController : Controller
    {
        private readonly ApplicationDbContext _db;

        public FoodController(ApplicationDbContext db)
        {
            _db = db;
        }

        // FoodItem:

        [HttpGet("fooditem")]
        public async Task<ActionResult<List<FoodItem>>> GetFoodItems()
        {
            return await _db.FoodItems.AsNoTracking().ToListAsync();
        }

        [HttpGet("fooditem/{id}")]
        public async Task<ActionResult<FoodItem>> GetFoodItem(int id)
        {
            FoodItem foodItem = await _db.FoodItems.Where(item => item.FoodID == id).FirstOrDefaultAsync();
            
            if (foodItem == null)
                return BadRequest("Food item does not exist");
            
            return foodItem;
        }

        // Nutrient:

        [HttpGet("nutrient")]
        public async Task<ActionResult<List<Nutrient>>> GetNutrients()
        {
           return await _db.Nutrients.AsNoTracking().ToListAsync();
        }

        [HttpGet("nutrient/{id}")]
        public async Task<ActionResult<Nutrient>> GetNutrient(int id)
        {
            Nutrient nutrient = await _db.Nutrients.Where(nutrient => nutrient.NutrientID == id).FirstOrDefaultAsync();

            if (nutrient == null)
                return BadRequest("Nutrient does not exist");

            return nutrient;
        }

        // YieldAmount:

        [HttpGet("yieldamount")]
        public async Task<ActionResult<List<YieldAmount>>> GetYieldAmounts()
        {
            return await _db.YieldAmounts.AsNoTracking().ToListAsync();
        }

        [HttpGet("yieldamount/{id}")]
        public async Task<ActionResult<YieldAmount>> GetYieldAmount(int id)
        {
            YieldAmount yieldAmount = await _db.YieldAmounts.Where(y => y.YieldAmountID == id).FirstOrDefaultAsync();

            if (yieldAmount == null)
                return BadRequest("Nutrient does not exist");

            return yieldAmount;
        }
    }
}
