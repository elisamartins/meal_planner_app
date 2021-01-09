using System.Collections.Generic;

namespace backend.DTO
{
    public class GroceryListDTO
    {
        public GroceryListDTO()
        {
        }

        public int GroceryListID { get; set; }
        public string Name { get; set; }
        public List<GroceryCategoryDTO> Categories { get; set; }
    }

    public class GroceryCategoryDTO
    {
        public string Category { get; set; }
        public List<GroceryItemDTO> Items { get; set; }
    }

    public class GroceryItemDTO
    {
        public int GroceryItemID { get; set; }
        public int FoodID { get; set; }
        public string FoodName { get; set; }
        public bool Checked { get; set; }
    }
}
