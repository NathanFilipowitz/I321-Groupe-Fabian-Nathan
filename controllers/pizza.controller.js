import pizzaService from '../services/pizza.service.js';
import responseSender from '../helpers/responseSender.js';

const pizzaController = {
    getPizzaById: async (req, res) => {
        const pizzaId = req.params.id;

        const pizza = await pizzaService.getPizzaById(pizzaId);

        const message = `La pizza avec l'id ${pizzaId} a bien été trouvé !`;
        return responseSender.sendSuccessResponse(res, pizza, message);

    },
    getAllPizzas: async (req,res) => {
        const pizzas = await pizzaService.getAllPizzas();

        const message = `Toutes les pizzas ont bien été trouvées`;
        return responseSender.sendSuccessResponse(res, pizzas, message);
    },
    getPizzaOfTheDay: async (req,res) => {
        const pizzaIdOfTheDay = await pizzaService.getPizzaIdOfTheDay()

        const pizza = await pizzaService.getPizzaById(pizzaIdOfTheDay[0].id);

        const message = `La pizza du jour a bien été trouvée.`;
        return responseSender.sendSuccessResponse(res, pizza, message);
    },
    getIngredientsByPizzaId: async (req,res) => {
        const pizzaId = req.params.id;

        const pizzaAndIngredients = await pizzaService.getIngredientsByPizzaId(pizzaId);

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
        const message = `L'ingrédient avec l'id ${ingredientId} a bien été trouvé !`;
        return responseSender.sendSuccessResponse(res, ingredient, message);
    },
    getAllIngredients: async (req,res) => {
        const ingredients = await pizzaService.getAllIngredients();

        const message = `Tous les ingrédients ont bien été trouvées`;
        return responseSender.sendSuccessResponse(res, ingredients, message);
    },
    createNewIngredient: async (req,res) => {
        // For POST requests, data is sent in the request body.
        const { name: ingredientName } = req.body;

        if (!ingredientName) {
            return responseSender.sendErrorResponse(res, "Le nom de l'ingrédient est requis.", 400);
        }

        const ingredient = await pizzaService.createNewIngredient(ingredientName);

        const message = `L'ingrédient à bien été crée.`;
        return responseSender.sendSuccessResponse(res, ingredient, message);
    },
    createNewPizza: async (req,res) => {
        const { name: pizzaName, price, is_offer, ingredients: ingredientNames } = req.body;

        if (!pizzaName) {
            return responseSender.sendErrorResponse(res, "Le nom de la pizza est requis.", 400);
        }

        const newPizza = await pizzaService.createNewPizza(pizzaName, price, is_offer, ingredientNames);

        const message = `La pizza '${pizzaName}' a bien été créée.`;
        return responseSender.sendSuccessResponse(res, newPizza, message);
    },
    changePizzaPrice: async (req,res) => {
        const pizzaId = req.params.id;
        const {price: newPrice} = req.body;

        if (newPrice === undefined) {
            return responseSender.sendErrorResponse(res, "Le nouveau prix de la Pizza est requis.", 400);
        }
        if (typeof newPrice !== 'number' || newPrice <= 0) {
            return responseSender.sendErrorResponse(res, "Le prix doit être un nombre positif.", 400);
        }
        if (Math.round(newPrice * 100) % 5 !== 0) {
            return responseSender.sendErrorResponse(res, "Le prix doit être arrondi aux 5 centimes.", 400);
        }

        const newPricedPizza = await pizzaService.changePizzaPrice(pizzaId, newPrice);

        const message = `Le prix de la pizza No '${pizzaId}' a bien été changé.`;
        return responseSender.sendSuccessResponse(res, newPricedPizza, message);
    },
    changeIngredientById: async (req,res) => {
        const ingredientId = req.params.id;
        const {name: newName} = req.body;

        if (newName === undefined) {
            return responseSender.sendErrorResponse(res, "Le nouveau nom pour l'ingrédient est requis.", 400);
        }

        const newIngredient = await pizzaService.changeIngredientName(ingredientId, newName);

        const message = `Le nom de l'ingrédient No '${ingredientId}' a bien été changé.`;
        return responseSender.sendSuccessResponse(res, newIngredient, message);
    }
};

export default pizzaController;
