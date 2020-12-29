using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    public class RecipeController : Controller
    {
        private readonly ApplicationDbContext _db;

        public RecipeController(ApplicationDbContext db)
        {
            _db = db;
        }

        // MealPlan:

        [HttpGet("recipe")]
        public async Task<ActionResult<List<Recipe>>> GetRecipes()
        {
            return await _db.Recipes.AsNoTracking().ToListAsync();
        }

        [HttpGet("recipe/{id}")]
        public async Task<ActionResult<Recipe>> GetRecipe(int id)
        {
            Recipe recipe = await _db.Recipes.Where(r => r.RecipeID == id).FirstOrDefaultAsync();

            if (recipe == null)
                return BadRequest("Recipe does not exist");

            return recipe;
        }

        // FoodEntry:

        [HttpGet("recipeItem")]
        public async Task<ActionResult<List<RecipeItem>>> GetRecipeItems()
        {
            return await _db.RecipeItems.AsNoTracking().ToListAsync();
        }

        [HttpGet("recipeItem/{id}")]
        public async Task<ActionResult<RecipeItem>> GetRecipeItem(int id)
        {
            RecipeItem recipeItem = await _db.RecipeItems.Where(r => r.RecipeItemID == id).FirstOrDefaultAsync();

            if (recipeItem == null)
                return BadRequest("Recipe item does not exist");

            return recipeItem;
        }
    }
}
