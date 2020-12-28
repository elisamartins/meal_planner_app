using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class FoodItem
    {
        [Required]
        [Key]
        public int FoodID { get; set; }

        [Required]
        [StringLength(100)]
        public string FoodName { get; set; }

        [Required]
        [StringLength(100)]
        public string FoodGroup { get; set; }
    }

    public class Nutrient
    {
        [Required]
        [Key]
        public int NutrientID { get; set; }

        [Required]
        public int FoodID { get; set; }

        [Required]
        [StringLength(100)]
        public string NutrientName { get; set; }

        public float NutrientValue { get; set; }

        //public string Unit { get; set; }
    }

    public class YieldAmount
    {
        [Required]
        [Key]
        public int YieldAmountID { get; set; }

        [Required]
        public int FoodID { get; set; }

        public float Amount { get; set; }

        //public string Unit { get; set; }
    }
}
