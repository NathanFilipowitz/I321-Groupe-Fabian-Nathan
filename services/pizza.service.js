import pizzaModel from '../models/pizza.model.js';
// import { exceptionGenerator } from '../helpers/exception-generator.js';

const pizzaService = {
    getPizzaById: async (id) => {

        const pizza = await pizzaModel.findPizzaByIdInDb(id);

        if (!pizza) {
            // throw exceptionGenerator(`La pizza avec l'id ${id} n'existe pas !`, 404);
            console.log(`Erreur [Code: ${id}]:`, pizza);
        }

        return pizza;
    },
    getAllPizzas: async () => {

        const pizzas = await pizzaModel.findAllPizzasInDb();

        if (!pizzas) {
            // throw exceptionGenerator(`La pizza avec l'id ${id} n'existe pas !`, 404);
            console.log(`Erreur dans service getAllPizzas:`,pizzas);
        }

        return pizzas;
    },
    getPizzaIdOfTheDay: async () => {

        const id = await pizzaModel.findPizzaIdOfTheDayInDb();

        return id;
    },
    getIngredientById: async (id) => {
        const ingredient = await pizzaModel.findIngredientByIdInDb(id);
        return ingredient;
    },
    getIngredientsByPizzaId: async (id) => {
        await pizzaModel.findPizzaByIdInDb(id);
        const ingredients = await pizzaModel.findIngredientsByPizzaIdInDb(id);
        return ingredients;
    },
    getAllIngredients: async () => {
        const ingredients = await pizzaModel.findAllIngredientsInDb();

        if (!ingredients) {
            console.log(`Erreur dans service getAllIngredients:`,ingredients);
        }

        return ingredients;
    },
    createNewIngredient: async (name) => {
        const newIngredient = await pizzaModel.createNewIngredientInDb(name);
        return newIngredient;
    },
    createNewPizza: async (pizzaName, price, is_offer, ingredientNames) => {
        const ingredientIds = [];
        for (const name of ingredientNames) {
            const ingredient = await pizzaModel.findIngredientByNameInDb(name);
            if (!ingredient) {
                throw new Error(`L'ingrédient nommé '${name}' n'existe pas.`);
            }
            ingredientIds.push(ingredient.id);
        }

        const newPizzaId = await pizzaModel.createNewPizzaInDb(pizzaName, price, is_offer);

        for (const id of ingredientIds) {
            await pizzaModel.addIngredientToPizzaInDb(newPizzaId, id);
        }

        return await pizzaModel.findPizzaByIdInDb(newPizzaId);
    },
    changePizzaPrice: async (pizzaId, newPrice) => {
        const newPricedPizza = await pizzaModel.changePizzaPriceByIdInDb(pizzaId, newPrice);

        return await pizzaModel.findPizzaByIdInDb(pizzaId);
    },
    changeIngredientName: async (ingredientId, newName) => {
        await pizzaModel.changeIngredientNameByIdInDb(ingredientId, newName);

        return await pizzaModel.findIngredientByIdInDb(ingredientId);
    }
};

export default pizzaService;
