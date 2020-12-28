using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Recipe
    {
        [Required]
        [Key]
        public int RecipeID { get; set; }

        [Required]
        [StringLength(100)]
        public string Username { get; set; }

        [StringLength(500)]
        public string Note { get; set; }
    }

    public class RecipeItem
    {
        [Required]
        [Key]
        public int RecipeItemID { get; set; }

        [Required]
        public int FoodID { get; set; }

        [Required]
        public int RecipeID { get; set; }

        public float Amount { get; set; }

        //public string Unit { get; set; }
    }
}
