import pizzaService from '../services/pizza.service.js';
import responseSender from '../helpers/responseSender.js';

const pizzaController = {
    getPizzaById: async (req, res) => {
        const pizzaId = req.params.id;
        const pizza = await pizzaService.getPizzaById(pizzaId);

        if (pizza.length === 0){
            const err = new Error(`Aucune pizza trouvée`);
            err.code = 404;
            throw err;
        }

        const message = `La pizza avec l'id ${pizzaId} a bien été trouvé !`;
        return responseSender.sendSuccessResponse(res, pizza, message);
    },
    getAllPizzas: async (req,res) => {
        const pizzas = await pizzaService.getAllPizzas();

        if (pizzas.length === 0) {
            const err = new Error(`Aucune pizza trouvée`);
            err.code = 404;
            throw err;
        }

        const message = `Toutes les pizzas ont bien été trouvées`;
        return responseSender.sendSuccessResponse(res, pizzas, message);
    },
    getPizzaOfTheDay: async (req,res) => {
        const pizzaIdOfTheDay = await pizzaService.getPizzaIdOfTheDay()

        const pizza = await pizzaService.getPizzaById(pizzaIdOfTheDay[0].id);

        if (pizza.length === 0){
            const err = new Error(`Aucune pizza trouvée`);
            err.code = 404;
            throw err;
        }

        const message = `La pizza du jour a bien été trouvée.`;
        return responseSender.sendSuccessResponse(res, pizza, message);
    },
    getIngredientsByPizzaId: async (req,res) => {
        const pizzaId = req.params.id;

        const pizzaAndIngredients = await pizzaService.getIngredientsByPizzaId(pizzaId);

        if (pizzaAndIngredients.length === 0){
            const err = new Error(`Aucun ingrédients trouvée pour la pizza ${pizzaId}`);
            err.code = 404;
            throw err;
        }

        const ingredientIds = [];

        for (let i = 0; i < pizzaAndIngredients.length; i++) {
            const pizzaAndIngredient = pizzaAndIngredients[i];
            ingredientIds.push(pizzaAndIngredient.ingredients_id);
        }

        const ingredients = [];
        
        for (const id of ingredientIds) {
            const ingredient = await pizzaService.getIngredientById(id);
            if (ingredient) {
                ingredients.push(ingredient);
            }
        }
        const message = `Les ingrédients de la pizza avec l'id ${pizzaId} ont bien été trouvés !`;
        return responseSender.sendSuccessResponse(res, ingredients, message);
    },
    getIngredientById: async (req,res) => {
        const ingredientId = req.params.id;
        const ingredient = await pizzaService.getIngredientById(ingredientId);

        if (ingredient.length === 0){
            const err = new Error(`Aucun ingrédients trouvé`);
            err.code = 404;
            throw err;
        }

        const message = `L'ingrédient avec l'id ${ingredientId} a bien été trouvé !`;
        return responseSender.sendSuccessResponse(res, ingredient, message);
    },
    getAllIngredients: async (req,res) => {
        const ingredients = await pizzaService.getAllIngredients();

        if (ingredients.length === 0){
            const err = new Error(`Aucun ingrédients trouvé`);
            err.code = 404;
            throw err;
        }

        const message = `Tous les ingrédients ont bien été trouvées`;
        return responseSender.sendSuccessResponse(res, ingredients, message);
    },
    createNewIngredient: async (req,res) => {
        const { name: ingredientName } = req.body;

        if (!ingredientName) {
            const err = new Error(`Le nom de l'ingrédient est requis.`);
            err.code = 400;
            throw err;
        }

        const ingredient = await pizzaService.createNewIngredient(ingredientName);

        const message = `L'ingrédient à bien été crée.`;
        return responseSender.sendSuccessResponse(res, ingredient, message);
    },
    createNewPizza: async (req,res) => {
        const { name: pizzaName, price, is_offer, ingredients: ingredientNames } = req.body;

        if (!pizzaName) {
            const err = new Error(`Le nom de la pizza est requis.`);
            err.code = 400;
            throw err;
        }

        const newPizza = await pizzaService.createNewPizza(pizzaName, price, is_offer, ingredientNames);

        const message = `La pizza '${pizzaName}' a bien été créée.`;
        return responseSender.sendSuccessResponse(res, newPizza, message);
    },
    changePizzaPrice: async (req,res) => {
        const pizzaId = req.params.id;
        const {price: newPrice} = req.body;

        if (newPrice === undefined) {
            const err = new Error(`Le nouveau prix de la Pizza est requis.`);
            err.code = 400;
            throw err;
        }
        if (typeof newPrice !== 'number' || newPrice <= 0) {
            const err = new Error(`Le prix doit être un nombre positif.`);
            err.code = 400;
            throw err;
        }
        if (Math.round(newPrice * 100) % 5 !== 0) {
            const err = new Error(`Le prix doit être arrondi aux 5 centimes.`);
            err.code = 400;
            throw err;
        }

        const newPricedPizza = await pizzaService.changePizzaPrice(pizzaId, newPrice);

        const message = `Le prix de la pizza No '${pizzaId}' a bien été changé.`;
        return responseSender.sendSuccessResponse(res, newPricedPizza, message);
    },
    changeIngredientById: async (req,res) => {
        const ingredientId = req.params.id;
        const {name: newName} = req.body;

        if (newName === undefined) {
            const err = new Error(`Le nouveau nom pour l'ingrédient est requis.`);
            err.code = 400;
            throw err;
        }

        const newIngredient = await pizzaService.changeIngredientName(ingredientId, newName);

        const message = `Le nom de l'ingrédient No '${ingredientId}' a bien été changé.`;
        return responseSender.sendSuccessResponse(res, newIngredient, message);
    },
    deletePizza: async (req,res) => {
        const pizzaId = req.params.id;
        const pizza = await pizzaService.getPizzaById(pizzaId);
        console.log(`controller: deleting pizza`);

        if (!pizza || pizza.length === 0) {
            const err = new Error(`La pizza avec l'ID ${pizzaId} n'existe pas`);
            err.code = 404;
            throw err;
        }

        const deletedPizza = await pizzaService.deletePizzaById(pizzaId);

        if (deletedPizza) {
            const message = `La pizza '${pizzaId}' a bien été supprimée.`;
            return responseSender.sendSuccessResponse(res, { id: pizzaId }, message, 200);
        }
        const err = new Error(`Erreur dans la suppression de la pizza ${pizzaId}`);
        err.code = 500;
        throw err;
    },
    deleteIngredient: async (req,res) => {
        const ingredientId = req.params.id;
        const ingredient = await pizzaService.getIngredientById(ingredientId);
        console.log(`controller: deleting ingredients`);

        if (!ingredient || ingredient.length === 0) {
            const err = new Error(`L'ingrédient avec l'ID ${ingredientId} n'existe pas`);
            err.code = 404;
            throw err;
        }

        const deletedIngredient = await pizzaService.deleteIngredientById(ingredientId);

        if (deletedIngredient) {
            const message = `L'ingrédient avec l'ID '${ingredientId}' a bien été supprimée.`;
            return responseSender.sendSuccessResponse(res, ingredientId, message, 200);
        }
        const err = new Error(`Erreur dans la suppression de l'ingrédient ${ingredientId}`);
        err.code = 500;
        throw err;
    }
};

export default pizzaController;
