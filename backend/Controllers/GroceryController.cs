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
        public async Task<ActionResult<GroceryListDTO>> GetGroceryList(int groceryListId)
        {
            GroceryList groceryList = await _db.GroceryLists.Where(g => g.GroceryListID == groceryListId).FirstOrDefaultAsync();

            if (groceryList == null)
                return BadRequest("Grocery list does not exist");

            List<GroceryItem> groceryItems = await _db.GroceryItems.Where(g => g.GroceryListID == groceryListId).ToListAsync();
            List<GroceryCategoryDTO> groceryCategoriesDTO = new List<GroceryCategoryDTO>();


            foreach (var item in groceryItems)
            {
                Console.WriteLine(item.FoodID);
                FoodItem foodItem = await _db.FoodItems.Where(f => f.FoodID == item.FoodID).FirstOrDefaultAsync();
                FoodGroup foodGroup = await _db.FoodGroups.Where(group => group.FoodGroupID == foodItem.FoodGroupID).FirstOrDefaultAsync();
                Console.WriteLine(foodGroup);
                GroceryItemDTO groceryItemDTO = new GroceryItemDTO()
                {
                    GroceryItemID = item.GroceryItemID,
                    FoodID = item.FoodID,
                    FoodName = foodItem.Name,
                    Checked = item.Checked
                };

                bool isAdded = false;
                for (int i = 0; i < groceryCategoriesDTO.Count(); i++)
                {
                    if (groceryCategoriesDTO[i].Category == foodGroup.Name)
                    {
                        groceryCategoriesDTO[i].Items.Add(groceryItemDTO);
                        isAdded = true;
                    }
                }

                if (!isAdded)
                {
                    groceryCategoriesDTO.Add(new GroceryCategoryDTO() {
                        Category = foodGroup.Name,
                        Items = new List<GroceryItemDTO>(){ groceryItemDTO }
                    });
                }
             
            }
            Console.WriteLine(groceryItems.ToString());


            GroceryListDTO groceryListDTO = new GroceryListDTO()
            {
                GroceryListID = groceryList.GroceryListID,
                Name = groceryList.Name,
                Categories = groceryCategoriesDTO,
            };


            return groceryListDTO;
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

            FoodItem foodItem = await _db.FoodItems.Where(f => f.FoodID == FoodID).FirstOrDefaultAsync();
            if (foodItem == null)
                return BadRequest("FoodID does not correspond to any food item.");

            _db.GroceryItems.Add(new GroceryItem()
            {
                FoodID = foodItem.FoodID,
                GroceryListID = groceryListId,
                Checked = false,
            });

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

        [HttpGet("groceryItem")]
        public async Task<ActionResult<List<GroceryItem>>> GetFoodEntries()
        {
            return await _db.GroceryItems.AsNoTracking().ToListAsync();
        }

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
