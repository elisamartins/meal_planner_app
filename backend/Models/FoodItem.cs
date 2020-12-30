﻿using Microsoft.EntityFrameworkCore;
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
        public int FoodGroupID { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

    }

    public class FoodGroup
    {
        [Required]
        [Key]
        public int FoodGroupID { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }
    }

    public class NutrientName
    {
        [Required]
        [Key]
        public int NutrientID { get; set; }

        [Required]
        public string Unit { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }
    }

    public class NutrientAmount
    {
        [Required]
        public int FoodID { get; set; }

        [Required]
        public int NutrientID { get; set; }

        [Required]
        public float Value { get; set; }
    }

    public class YieldName
    {
        [Required]
        [Key]
        public int YieldID { get; set; }

        [Required]
        public string Name { get; set; }
    }

    [Keyless]
    public class YieldAmount
    {
        [Required]
        public int FoodID { get; set; }

        [Required]
        public int YieldID { get; set; }

        [Required]
        public float Amount { get; set; }
    }
}
