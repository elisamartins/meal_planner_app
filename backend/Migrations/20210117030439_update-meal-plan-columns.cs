using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class updatemealplancolumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "MealPlans");

            migrationBuilder.RenameColumn(
                name: "Category",
                table: "FoodEntries",
                newName: "Section");

            migrationBuilder.AddColumn<int>(
                name: "Day",
                table: "MealPlans",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Month",
                table: "MealPlans",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "MealPlans",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PortionName",
                table: "FoodEntries",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Day",
                table: "MealPlans");

            migrationBuilder.DropColumn(
                name: "Month",
                table: "MealPlans");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "MealPlans");

            migrationBuilder.DropColumn(
                name: "PortionName",
                table: "FoodEntries");

            migrationBuilder.RenameColumn(
                name: "Section",
                table: "FoodEntries",
                newName: "Category");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "MealPlans",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
