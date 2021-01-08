using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO
{
    public class FoodItemDTO
    {
        public string FoodName;
        public string FoodGroup;
        public NutrientDTO[] Nutrients;
        public YieldAmountDTO[] YieldAmounts;
    }

    public class NutrientDTO
    {
        public string Name;
        public float Value;
        public string Unit;
    }

    public class YieldAmountDTO
    {
        public float Amount;
        public string Unit;
    }
}
