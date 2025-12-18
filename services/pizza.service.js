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
    getDailyPizzaId: async () => {
        const id = await pizzaModel.findDailyPizzaIdInDb();

        if (id === undefined || id === null) {
            const err = new Error(`Aucune pizza trouvée`);
            err.code = 404;
            throw err;
        }

        return id;
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

        if (!newIngredient) {
            const err = new Error(`Erreur dans la création de l'ingrédient`);
            err.code = 500;
            throw err;
        }

        return newIngredient;
    },
    createNewPizza: async (pizzaName, price, ingredientNames) => {
        if (!pizzaName) {
            const err = new Error(`Le nom de la pizza est requis.`);
            err.code = 400;
            throw err;
        }

        const ingredientIds = [];
        for (const name of ingredientNames) {
            const ingredient = await pizzaModel.findIngredientByNameInDb(name);
            if (ingredient.length === 0) {
                const newIngredient = await pizzaModel.createNewIngredientInDb(name);

                if (!newIngredient) {
                    const err = new Error(`Erreur lors de la création de l'ingrédient.`);
                    err.code = 500;
                    throw err;
                }
                ingredientIds.push(newIngredient);
            } else {
                ingredientIds.push(ingredient[0].id);
            }
        }

        const newPizzaId = await pizzaModel.createNewPizzaInDb(pizzaName, price);

        for (const id of ingredientIds) {
            await pizzaModel.addIngredientToPizzaInDb(newPizzaId, id);
        }

        return await pizzaModel.findPizzaByIdInDb(newPizzaId);
    },
    changeIngredientName: async (ingredientId, newName) => {
        const newIngredients = await pizzaModel.changeIngredientNameByIdInDb(ingredientId, newName);
        const ingredient = await pizzaModel.findIngredientByIdInDb(ingredientId);

        if (newIngredients.length === 0) {
            const err = new Error(`Erreur lors du changement d'ingrédient.`);
            err.code = 500;
            throw err;
        }

        if (ingredient.length === 0) {
            const err = new Error(`Nouvel ingrédient pas trouvé.`);
            err.code = 404;
            throw err;
        }

        return ingredient;
    },
    changePizza: async (isDaily, pizzaId, pizzaNewId = null, name = null, price = null, ingredients = null) => {
        if (pizzaNewId) {
            await pizzaModel.changeDailyPizzaInDb(pizzaNewId);
            return true
        }
        if (!pizzaId){
            pizzaId = await pizzaModel.findDailyPizzaIdInDb();
        }
        const changedPizza = await pizzaModel.changePizzaByIdInDb(isDaily, pizzaId, name, price);

        if (ingredients) {
            await pizzaModel.deletePizzaHasIngredientInDb(pizzaId);
            for (let ingredient of ingredients) {
                let existingIngredient = await pizzaModel.findIngredientByNameInDb(ingredient);

                if (existingIngredient.length === 0){
                    // Ajouter ingrédient si non existant
                    const ingredientId = await pizzaModel.createNewIngredientInDb(ingredient);
                    await pizzaModel.addIngredientToPizzaInDb(pizzaId, ingredientId);
                } else {
                    // Ajouter ingrédient si existant
                    await pizzaModel.addIngredientToPizzaInDb(pizzaId, existingIngredient[0].id);
                }
            }
        }

        if (!changedPizza && !ingredients) {
            const err = new Error("Une modification doit être effectuée.");
            err.code = 500;
            throw err;
        }

        return changedPizza;
    },
    deletePizzaById: async (id) => {
        const deletedPizzaHasIngredients = await pizzaModel.deletePizzaHasIngredientInDb(id);
        const deletedPizza = await pizzaModel.deletePizzaInDb(id);

        if (deletedPizzaHasIngredients.length === 0) {
            const err = new Error(`Les ingrédients de la pizza avec l'ID ${id} n'ont pas pu être supprimés.`);
            err.code = 500;
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

        if (!deletedIngredientHasPizza) {
            const err = new Error(`Les ingrédients de la pizza avec l'ID ${id} n'ont pas pu être supprimés.`);
            err.code = 500;
            throw err;
        }
        if (!deletedIngredient) {
            const err = new Error(`L'ingrédient avec l'ID ${id} n'a pas pu être supprimée car elle n'existe pas.`);
            err.code = 404;
            throw err;
        }

        return true;
    },
};

export default pizzaService;
