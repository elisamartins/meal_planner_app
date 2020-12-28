using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class MealPlan
    {
        [Required]
        [Key]
        public int MealPlanID { get; set; }

        [Required]
        [StringLength(100)]
        public string Username { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }

    public class FoodEntry
    {
        [Required]
        [Key]
        public int FoodEntryID { get; set; }

        [Required]
        public int FoodID { get; set; }

        [Required]
        public int MealPlanID { get; set; }

        public string Category { get; set; }

        public float Amount { get; set; }

        //public string Unit { get; set; }
    }
}
