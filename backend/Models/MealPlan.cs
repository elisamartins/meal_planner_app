using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Date
    {
        public int year { get; set; }
        public int month { get; set; }
        public int day { get; set; }
    }

    public class MealPlan
    {
        [Required]
        [Key]
        public int MealPlanID { get; set; }

        [Required]
        [StringLength(100)]
        public string Username { get; set; }

        [Required]
        public Date Date { get; set; }
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

        public string Section { get; set; }

        public float Amount { get; set; }

        public string PortionName { get; set; }
    }
}
