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
            return await _db.FoodItems.ToListAsync();
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
        public async Task<ActionResult<List<NutrientName>>> GetNutrients()
        {
           return await _db.NutrientNames.AsNoTracking().ToListAsync();
        }

        [HttpGet("nutrient/{id}")]
        public async Task<ActionResult<NutrientName>> GetNutrient(int id)
        {
            NutrientName nutrient = await _db.NutrientNames.Where(nutrient => nutrient.NutrientID == id).FirstOrDefaultAsync();

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
        public async Task<ActionResult<YieldName>> GetYieldAmount(int id)
        {
            YieldName yieldName = await _db.YieldNames.Where(y => y.YieldID == id).FirstOrDefaultAsync();

            if (yieldName == null)
                return BadRequest("Nutrient does not exist");

            return yieldName;
        }
    }
}
