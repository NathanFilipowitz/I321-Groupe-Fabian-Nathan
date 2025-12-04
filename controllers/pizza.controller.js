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
        const ingredientName = req.params.name;

        if (!ingredientName) {
            return responseSender.sendErrorResponse(res, "Le nom de l'ingrédient est requis.", 400);
        }

        const ingredient = await pizzaService.createNewIngredient(ingredientName);

        const message = `L'ingrédient à bien été crée.`;
        return responseSender.sendSuccessResponse(res, ingredient, message);
    }
};

export default pizzaController;