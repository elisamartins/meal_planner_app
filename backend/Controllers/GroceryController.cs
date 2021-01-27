using backend.DTO;
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

        // Grocery List:

        [HttpGet("groceryLists/{username}")]
        public async Task<ActionResult<List<GroceryList>>> GetGroceryLists(string username)
        {
            List<GroceryList> groceryList = await _db.GroceryLists.Where(g => g.Username == username).ToListAsync();

            if (groceryList == null)
                return BadRequest("No grocery list");

            return groceryList;
        }
        [HttpGet("groceryList/{groceryListId}")]
        public async Task<ActionResult<object>> GetGroceryList(int groceryListId)
        {
            var result = await _db.GroceryLists.Where(x => x.GroceryListID == groceryListId).Include("GroceryListCategories.GroceryItems.FoodItem").Select(x => new GroceryListDTO()
            {
                GroceryListID = x.GroceryListID,
                Name = x.Name,
                Categories = x.GroceryListCategories.Select(
                y => new GroceryCategoryDTO()
                {
                    Category = y.Category,
                    Items = (List<GroceryItemDTO>)y.GroceryItems.Select(
                        z => new GroceryItemDTO()
                        {
                            GroceryItemID = z.GroceryItemID,
                            FoodID = z.FoodItem.FoodID,
                            FoodName = z.FoodItem.Name,
                            Checked = z.Checked
                        })
                }).ToList(),
            }).FirstAsync();
            return result;
        }

        [HttpPut("groceryList/{groceryListId}")]
        public async Task<ActionResult> CheckGroceryItem(int groceryListId, [FromBody] string title)
        {
            GroceryList groceryList = await _db.GroceryLists.Where(f => f.GroceryListID == groceryListId).FirstOrDefaultAsync();
            if (groceryList == null)
                return BadRequest("GroceryListID does not correspond to any list.");

            groceryList.Name = title;

            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("groceryList/{username}")]
        public async Task<ActionResult<int>> AddGroceryList(string username, [FromBody] string listName)
        {
            if (username == null)
                return BadRequest("Invalid client request");

            GroceryList groceryList = new GroceryList()
            {
                Username = username,
                Name = listName,
                GroceryListCategories = new List<GroceryListCategory>(),
            };
            _db.GroceryLists.Add(groceryList);

            await _db.SaveChangesAsync();
            return groceryList.GroceryListID;
        }


        [HttpDelete("groceryList/{groceryListId}")]
        public async Task<ActionResult> DeleteGroceryList(int groceryListId)
        {
            GroceryList groceryList = await _db.GroceryLists.Where(f => f.GroceryListID == groceryListId).FirstOrDefaultAsync();
            if (groceryList == null)
                return BadRequest("GroceryListID does not correspond to any list.");

            _db.GroceryLists.Remove(groceryList);
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("groceryItem/{groceryListId}")]
        public async Task<ActionResult> AddGroceryItem(int groceryListId, [FromBody] int FoodID)
        {
            GroceryList groceryList = await _db.GroceryLists.Where(f => f.GroceryListID == groceryListId).Include("GroceryListCategories.GroceryItems").FirstOrDefaultAsync();
            FoodItem foodItem = await _db.FoodItems.Where(f => f.FoodID == FoodID).FirstOrDefaultAsync();
            if (foodItem == null)
                return BadRequest("FoodID does not correspond to any food item.");

            string foodGroup = (await _db.FoodGroups.Where(x => x.FoodGroupID == foodItem.FoodGroupID).FirstAsync()).Name;
            GroceryItem gi = new GroceryItem()
            {
                FoodItem = await _db.FoodItems.Where(x => x.FoodID == FoodID).FirstAsync(),
                Checked = false,
            };
            bool found = false;
            foreach (GroceryListCategory glc in groceryList.GroceryListCategories)
            {
                if (glc.Category == foodGroup)
                {
                    Console.WriteLine(glc.GroceryItems);
                    glc.GroceryItems.Add(gi);
                    found = true;
                }
            }

            if (!found)
            {
                groceryList.GroceryListCategories.Add(
                    new GroceryListCategory()
                    {
                        Category = foodGroup,
                        GroceryItems = new List<GroceryItem>() { gi }
                    }
                    );
            }

            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("checkGroceryItem/{groceryItemId}")]
        public async Task<ActionResult> CheckGroceryItem(int groceryItemId, [FromBody] bool isChecked)
        {
            GroceryItem groceryItem = await _db.GroceryItems.Where(f => f.GroceryItemID == groceryItemId).FirstOrDefaultAsync();
            if (groceryItem == null)
                return BadRequest("GroceryItemID does not correspond to any item.");

            groceryItem.Checked = isChecked;

            await _db.SaveChangesAsync();
            return Ok();
        }

        // FoodEntry:

        [HttpGet("groceryItem/{id}")]
        public async Task<ActionResult<GroceryItem>> GetFoodEntry(int id)
        {
            GroceryItem groceryItem = await _db.GroceryItems.Where(g => g.GroceryItemID == id).FirstOrDefaultAsync();

            if (groceryItem == null)
                return BadRequest("Grocery item does not exist");

            return groceryItem;
        }
    }
}
