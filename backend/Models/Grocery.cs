using System.Collections.Generic;
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

        public ICollection<GroceryListCategory> GroceryListCategories { get; set; }
    }

    public class GroceryListCategory
    {
        [ScaffoldColumn(false)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int GroceryListCategoryID { get; set; }

        [Required]
        public string Category { get; set; }

        [ForeignKey("GroceryList")]
        public int GroceryListID { get; set; }

        public ICollection<GroceryItem> GroceryItems { get; set; }
    }

    public class GroceryItem
    {
        [ScaffoldColumn(false)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int GroceryItemID { get; set; }

        public bool Checked { get; set; }

        [ForeignKey("GroceryListCategory")]
        public int GroceryCategoryID { get; set; }

        public FoodItem FoodItem { get; set; }

    }
}