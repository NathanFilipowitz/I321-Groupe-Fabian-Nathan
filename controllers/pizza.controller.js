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
    deletePizza: async (req,res) => {
        const pizzaId = req.params.id;
        const pizza = await pizzaService.getPizzaById(pizzaId);

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

        if (!ingredientId) {
            return responseSender.sendErrorResponse(res, "L'ID de l'ingrédient est requis.", 400);
        }
        if (ingredient.length <= 0) {
            return responseSender.sendErrorResponse(res, `L'ingrédient avec l'ID ${ingredientId} n'existe pas`, 404);
        }

        const deletedPizza = await pizzaService.deleteIngredientById(ingredientId);

        if (deletedPizza) {
            const message = `La pizza '${ingredientId}' a bien été supprimée.`;
            return responseSender.sendSuccessResponse(res, ingredientId, message, 200);
        } else {
            const message = `Erreur dans la suppression de la pizza ${ingredientId}`;
            return responseSender.sendErrorResponse(res, message, 400);
        }
    }
};

export default pizzaController;