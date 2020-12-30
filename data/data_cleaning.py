import numpy as np
import pandas as pd

# Load datasets
food_item_df =  pd.read_csv('FCEN/FOOD NAME.csv',encoding = "ISO-8859-1", dtype=str)
food_group_df = pd.read_csv('FCEN/FOOD GROUP.csv', encoding = "ISO-8859-1", dtype=str)
nutrient_name_df = pd.read_csv('FCEN/NUTRIENT NAME.csv', encoding = "ISO-8859-1", dtype=str)
nutrient_amount_df = pd.read_csv('FCEN/NUTRIENT AMOUNT.csv', encoding = "ISO-8859-1", dtype=str)
yield_name_df = pd.read_csv('FCEN/YIELD NAME.csv', encoding = "ISO-8859-1", dtype=str)
yield_amount_df = pd.read_csv('FCEN/YIELD AMOUNT.csv', encoding = "ISO-8859-1", dtype=str)

# Drop unused columns
to_drop_food_item = ['FoodCode', 'FoodSourceID', 'FoodDescription', 'FoodDateOfEntry', 'FoodDateOfPublication', 'CountryCode', 'ScientificName']
to_drop_food_group = ['FoodGroupCode', 'FoodGroupName']
to_drop_nutrient_name = ['NutrientCode', 'NutrientSymbol', 'Tagname', 'NutrientDecimals', 'NutrientName']
to_drop_nutrient_amount = ['StandardError', 'NumberofObservations', 'NutrientSourceID', 'NutrientDateOfEntry']
to_drop_yield_name_df = ['YieldDescription']
to_drop_yield_amount = ['YieldDateofEntry']

food_item_df = food_item_df.drop(to_drop_food_item, axis=1)
food_group_df = food_group_df.drop(to_drop_food_group, axis=1)
nutrient_name_df = nutrient_name_df.drop(to_drop_nutrient_name, axis=1)
nutrient_amount_df = nutrient_amount_df.drop(to_drop_nutrient_amount, axis=1)
yield_name_df = yield_name_df.drop(to_drop_yield_name_df, axis=1)
yield_amount_df = yield_amount_df.drop(to_drop_yield_amount, axis=1)
yield_amount_df = yield_amount_df.drop(yield_amount_df.columns[-4:], axis=1)

# Rename columns
food_item_df = food_item_df.rename(columns = {'FoodDescriptionF':'Name'})
food_group_df = food_group_df.rename(columns = {'FoodGroupNameF':'Name'})
nutrient_name_df = nutrient_name_df.rename(columns = {'NutrientNameF':'Name'})
nutrient_name_df = nutrient_name_df.rename(columns = {'NutrientUnit':'Unit'})
nutrient_amount_df = nutrient_amount_df.rename(columns = {'NutrientValue':'Value'})
yield_name_df = yield_name_df.rename(columns = {'YieldDescriptionF':'Name'})
yield_amount_df = yield_amount_df.rename(columns = {'YieldAmount':'Amount'})

# Convert back to csv file
food_item_df.to_csv('cleaned_data/food_item.csv', index=False, encoding = "UTF-8")
food_group_df.to_csv('cleaned_data/food_group.csv', index=False, encoding = "UTF-8")
nutrient_name_df.to_csv('cleaned_data/nutrient_name.csv', index=False, encoding = "UTF-8")
nutrient_amount_df.to_csv('cleaned_data/nutrient_amount.csv', index=False, encoding = "UTF-8")
yield_name_df.to_csv('cleaned_data/yield_name.csv', index=False, encoding = "UTF-8")
yield_amount_df.to_csv('cleaned_data/yield_amount.csv', index=False, encoding = "UTF-8")