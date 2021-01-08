using System.Collections.Generic;

namespace backend.DTO
{
    public class GroceryListDTO
    {
        public GroceryListDTO()
        {
        }

        public int ID { get; set; }
        public string Name { get; set; }
        public List<GroceryItemDTO> Items { get; set; }
    }

    public class GroceryItemDTO
    {
        public int ID { get; set; }
        public int FoodID { get; set; }
        public string FoodName { get; set; }
        public float Amount { get; set; }
        public string Unit { get; set; }
        public bool Checked { get; set; }
    }
}
