import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("combined"));

app.get("/", async (req, res) => {
  //   try {
  //     if (!drink) {
  //       drink = await axios.get(
  //         "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  //       );
  //     }
  //   } catch (error) {
  //     res.status(404).send(error.message);
  //   }

  //   const randDrink = drink.data.drinks[0];
  //   res.render("index.ejs", {
  //     content: randDrink,
  //   });
  res.render("index.ejs");
});
app.get("/cocktail", async (req, res) => {
  res.render("sCocktail.ejs");
});

app.post("/cocktail", async (req, res) => {
  const cocktailName = req.body.sInput;
  try {
    const result = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
    );
    const randDrink = result.data.drinks[0];
    let ingredients = [];
    let ingredientsList = [];
    let count = 1;
    while (randDrink["strIngredient" + count]) {
      ingredients.push(
        randDrink["strMeasure" + count] +
          " " +
          randDrink["strIngredient" + count]
      );
      ingredientsList.push(randDrink["strIngredient" + count]);
      count += 1;
    }
    res.render("sCocktail.ejs", {
        content: randDrink,
        ingredients: ingredients,
        ingredientsList: ingredientsList,
      });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/random-cocktail", async (req, res) => {
  try {
    const result = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const randDrink = result.data.drinks[0];
    let ingredients = [];
    let ingredientsList = [];
    let count = 1;
    while (randDrink["strIngredient" + count]) {
      ingredients.push(
        randDrink["strMeasure" + count] +
          " " +
          randDrink["strIngredient" + count]
      );
      ingredientsList.push(randDrink["strIngredient" + count]);
      count += 1;
    }
    res.render("rCocktail.ejs", {
      content: randDrink,
      ingredients: ingredients,
      ingredientsList: ingredientsList,
    });
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
