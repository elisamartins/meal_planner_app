using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace backend.Models
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<GroceryList> GroceryLists { get; set; }
        public DbSet<GroceryItem> GroceryItems { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<RecipeItem> RecipeItems { get; set; }
        public DbSet<MealPlan> MealPlans { get; set; }
        public DbSet<FoodEntry> FoodEntries { get; set; }
        public DbSet<NutrientName> NutrientNames { get; set; }
        public DbSet<YieldAmount> NutrientAmount { get; set; }
        public DbSet<YieldName> YieldNames { get; set; }
        public DbSet<YieldAmount> YieldAmounts { get; set; }

    }
}
