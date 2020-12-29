using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    public class GroceryController : Controller
    {
        private readonly ApplicationDbContext _db;

        public GroceryController(ApplicationDbContext db)
        {
            _db = db;
        }

        // MealPlan:

        [HttpGet("grocerylist")]
        public async Task<ActionResult<List<GroceryList>>> GetGroceryLists()
        {
            return await _db.GroceryLists.AsNoTracking().ToListAsync();
        }

        [HttpGet("grocerylist/{id}")]
        public async Task<ActionResult<GroceryList>> GetMealPlan(int id)
        {
            GroceryList groceryList = await _db.GroceryLists.Where(g => g.GroceryListID == id).FirstOrDefaultAsync();

            if (groceryList == null)
                return BadRequest("Grocery list does not exist");

            return groceryList;
        }

        // FoodEntry:

        [HttpGet("groceryitem")]
        public async Task<ActionResult<List<GroceryItem>>> GetFoodEntries()
        {
            return await _db.GroceryItems.AsNoTracking().ToListAsync();
        }

        [HttpGet("groceryitem/{id}")]
        public async Task<ActionResult<GroceryItem>> GetFoodEntry(int id)
        {
            GroceryItem groceryItem = await _db.GroceryItems.Where(g => g.GroceryItemID == id).FirstOrDefaultAsync();

            if (groceryItem == null)
                return BadRequest("Grocery item does not exist");

            return groceryItem;
        }
    }
}
