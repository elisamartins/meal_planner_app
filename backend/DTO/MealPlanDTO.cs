using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO
{
    public class MealPlanDTO
    {
        public int MealPlanID { get; set; }
        public string Name { get; set; }
        public List<FoodEntryDTO> Breakfast { get; set; }
        public List<FoodEntryDTO> Lunch { get; set; }
        public List<FoodEntryDTO> Dinner { get; set; }
    }

    public class FoodEntryDTO
    {
        public int FoodID { get; set; }
        public string FoodName { get; set; }
        public float Amount { get; set; }
        public string PortionName { get; set; }
    }
}
