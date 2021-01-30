export const DUMMY_RECIPE_LIST = [
  {
    title: 'Petit déjeûner',
    data: [
      {
        recipeName: 'Crêpes nature',
        image: require('../../assets/recipe_images/crepes.jpg'),
        ingredients: [],
      },
      {
        recipeName: 'Omelette aux tomates et parmesan',
        image: require('../../assets/recipe_images/omelette.jpg'),
        ingredients: [
          {
            ingredientName: 'Oeufs entiers',
            amount: 4,
            unit: '',
          },
          {
            ingredientName: 'Tomates cerises',
            amount: 1,
            unit: 'tasse',
          },
          {
            ingredientName: 'Brocoli cuit',
            amount: 1,
            unit: 'tasse',
          },
          {
            ingredientName: 'Parmesan',
            amount: 20,
            unit: 'g',
          },
          {
            ingredientName: 'Huile',
            amount: 1,
            unit: 'cuillère à soupe',
          },
          {
            ingredientName: 'Persil',
            amount: null,
            unit: '',
          },
        ],
      },
      {
        recipeName: 'Gruau aux baies',
        image: require('../../assets/recipe_images/gruau.jpg'),
        ingredients: [],
      },
    ],
  },
  {
    title: 'Plats principaux',
    data: [
      {
        recipeName: 'Salade au poulet grillé',
        image: require('../../assets/recipe_images/salade.jpg'),
        ingredients: [],
      },
      {
        recipeName: 'Macaroni sauce tomate épicé',
        image: require('../../assets/recipe_images/macaroni.jpg'),
        ingredients: [],
      },
      {
        recipeName: 'Saumon grillé au citron',
        image: require('../../assets/recipe_images/saumon.jpg'),
        ingredients: [],
      },
    ],
  },
  {
    title: 'Boissons',
    data: [
      {
        recipeName: 'Smoothie aux bleuets',
        image: require('../../assets/recipe_images/smoothie.jpg'),
        ingredients: []
      },
    ],
  },
];
