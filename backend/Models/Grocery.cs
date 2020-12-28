using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class GroceryList
    {
        [Required]
        [Key]
        public int GroceryListID { get; set; }

        [Required]
        [StringLength(100)]
        public string Username { get; set; }
    }

    public class GroceryItem
    {
        [Required]
        [Key]
        public int GroceryItemID { get; set; }

        [Required]
        public int FoodID { get; set; }

        [Required]
        public int GroceryListID { get; set; }

        public float Amount { get; set; }

        //public string Unit { get; set; }
    }
}