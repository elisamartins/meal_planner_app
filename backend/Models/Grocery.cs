using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class GroceryList
    {
        [ScaffoldColumn(false)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int GroceryListID { get; set; }

        [Required]
        [StringLength(100)]
        public string Username { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }
    }

    public class GroceryItem
    {
        [ScaffoldColumn(false)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int GroceryItemID { get; set; }

        [Required]
        public int FoodID { get; set; }

        [Required]
        public int GroceryListID { get; set; }

        public float Amount { get; set; }

        public string Unit { get; set; }

        public bool Checked { get; set; }
    }
}