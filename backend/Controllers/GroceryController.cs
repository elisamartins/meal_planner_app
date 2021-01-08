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

            List<GroceryItemDTO> groceryItemsDTO = new List<GroceryItemDTO>();

            foreach (var item in groceryItems)
            {

                var foodi = await _db.FoodItems.Where(f => f.FoodID == item.FoodID).FirstOrDefaultAsync();
                groceryItemsDTO.Add(new GroceryItemDTO()
                {
                    ID = item.GroceryItemID,
                    FoodID = item.FoodID,
                    FoodName = foodi.Name,
                    Amount = item.Amount,
                    Unit = "g",
                    Checked = item.Checked
                });
            }
            Console.WriteLine(groceryItems.ToString());

            GroceryListDTO groceryListDTO = new GroceryListDTO()
            {
                ID = groceryList.GroceryListID,
                Name = groceryList.Name,
                Items = groceryItemsDTO,
            };

            return groceryListDTO;
        }

        [HttpPost("groceryList/{username}")]
        public async Task<ActionResult> AddGroceryList(string username, [FromBody] GroceryListDTO groceryListDTO)
        {
            if (username == null)
                return BadRequest("Invalid client request");

            _db.GroceryLists.Add(new GroceryList
            {
                Username = username,
                Name = groceryListDTO.Name,
            });

            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("groceryItem/{groceryListId}")]
        public async Task<ActionResult> AddGroceryItem(int groceryListId, [FromBody] GroceryItemDTO groceryItemDTO)
        {
            if (groceryItemDTO == null)
                return BadRequest("Invalid client request");

            _db.GroceryItems.Add(new GroceryItem()
            {
                FoodID = 1,
                GroceryListID = groceryListId,
                Amount = groceryItemDTO.Amount,
                Unit = groceryItemDTO.Unit,
                Checked = groceryItemDTO.Checked,
            });

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
