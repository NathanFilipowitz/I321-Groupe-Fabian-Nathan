import pizzaModel from '../models/pizza.model.js';

const pizzaService = {
    getPizzaById: async (id) => {
        const pizza = await pizzaModel.findPizzaByIdInDb(id);

        if (pizza.length === 0) {
            const err = new Error(`Aucune pizza trouvée`);
            err.code = 404;
            throw err;
        }

        return pizza
    },
    getAllPizzas: async () => {
        const pizzas = await pizzaModel.findAllPizzasInDb();

        if (pizzas.length === 0) {
            const err = new Error(`Aucune pizza trouvée`);
            err.code = 404;
            throw err;
        }

        return pizzas;
    },
    getPizzaIdOfTheDay: async () => {
        const id = await pizzaModel.findPizzaIdOfTheDayInDb();

        if (id.length === 0) {
            const err = new Error(`Aucune pizza trouvée`);
            err.code = 404;
            throw err;
        }

        return id;
    },
    getIngredientById: async (id) => {
        const ingredient = await pizzaModel.findIngredientByIdInDb(id);

        if (ingredient.length === 0) {
            const err = new Error(`Aucun ingrédients trouvé`);
            err.code = 404;
            throw err;
        }

        return ingredient;
    },
    getIngredientsByPizzaId: async (id) => {
        const pizza = await pizzaModel.findPizzaByIdInDb(id);
        const ingredients = await pizzaModel.findIngredientsByPizzaIdInDb(id);

        if (pizza.length === 0) {
            const err = new Error(`Aucune pizza trouvée`);
            err.code = 404;
            throw err;
        }

        if (ingredients.length === 0) {
            const err = new Error(`Aucun ingrédients trouvé`);
            err.code = 404;
            throw err;
        }

        return ingredients;
    },
    getAllIngredients: async () => {
        const ingredients = await pizzaModel.findAllIngredientsInDb();

        if (ingredients.length === 0) {
            const err = new Error(`Aucun ingrédients trouvé`);
            err.code = 404;
            throw err;
        }

        return ingredients;
    },
    createNewIngredient: async (name) => {
        const newIngredient = await pizzaModel.createNewIngredientInDb(name);

        if (newIngredient.length === 0) {
            const err = new Error(`Aucun ingrédients trouvé`);
            err.code = 404;
            throw err;
        }

        return newIngredient;
    },
    createNewPizza: async (pizzaName, price, is_offer, ingredientNames) => {
        const ingredientIds = [];
        for (const name of ingredientNames) {
            const ingredient = await pizzaModel.findIngredientByNameInDb(name);
            if (ingredient.length === 0) {
                const err = new Error(`Aucun ingrédients trouvé`);
                err.code = 404;
                throw err;
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
        const pizza = await pizzaModel.findPizzaByIdInDb(pizzaId);

        if (newPricedPizza.length === 0) {
            const err = new Error(`Erreur lors du changement de prix de la pizza`);
            err.code = 404;
            throw err;
        }

        if (pizza.length === 0) {
            const err = new Error(`Aucune pizza trouvée`);
            err.code = 404;
            throw err;
        }

        return pizza;
    },
    changeIngredientName: async (ingredientId, newName) => {
        const newIngredients =  pizzaModel.changeIngredientNameByIdInDb(ingredientId, newName);
        const ingredient = await pizzaModel.findIngredientByIdInDb(ingredientId);

        if (newIngredients.length === 0) {
            const err = new Error(`Erreur lors du changement d'ingrédient`);
            err.code = 404;
            throw err;
        }

        if (ingredient.length === 0) {
            const err = new Error(`Ingrédient pas trouvé`);
            err.code = 404;
            throw err;
        }

        return ingredient;
    },
    deletePizzaById: async (id) => {
        const deletedPizzaHasIngredients = await pizzaModel.deletePizzaHasIngredientInDb(id);
        const deletedPizza = await pizzaModel.deletePizzaInDb(id);

        if (deletedPizzaHasIngredients.length === 0) {
            const err = new Error(`Les ingrédients de la pizza avec l'ID ${id} n'ont pas pu être supprimés.`);
            err.code = 404;
            throw err;
        }
        if (deletedPizza.length === 0) {
            const err = new Error(`La pizza avec l'ID ${id} n'a pas pu être supprimée car elle n'existe pas.`);
            err.code = 404;
            throw err;
        }

        return true;

    },
    deleteIngredientById: async (id) => {
        const deletedIngredientHasPizza = await pizzaModel.deleteIngredientHasPizzaInDb(id);
        const deletedIngredient = await pizzaModel.deleteIngredientInDb(id);
        if (deletedIngredientHasPizza) {
            const err = new Error(`Les ingrédients de la pizza avec l'ID ${id} n'ont pas pu être supprimés.`);
            err.code = 404;
            throw err;
        }
        if (deletedIngredient) {
            const err = new Error(`L'ingrédient avec l'ID ${id} n'a pas pu être supprimée car elle n'existe pas.`);
            err.code = 404;
            throw err;
        }

        return deletedIngredient;
    },
};

export default pizzaService;
