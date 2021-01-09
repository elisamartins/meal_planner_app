using CsvHelper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;

namespace backend.Models
{
    public class CsvImporter
    {
        public List<FoodItem> ImportFoodItems()
        {
            try
            {

                using (var reader = new StreamReader("../data/cleaned_data/food_item.csv"))
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    return csv.GetRecords<FoodItem>().ToList();

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public List<FoodGroup> ImportFoodGroups()
        {
            try
            {

                using (var reader = new StreamReader("../data/cleaned_data/food_group.csv"))
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {

                    return csv.GetRecords<FoodGroup>().ToList();

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }


    }
}
