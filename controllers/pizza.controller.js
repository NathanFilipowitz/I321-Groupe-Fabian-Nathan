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
        const pizzaIdOfTheDay = await pizzaService.getDailyPizzaId()

        const pizza = await pizzaService.getPizzaById(pizzaIdOfTheDay[0].id);

        const message = `La pizza du jour a bien été trouvée.`;
        return responseSender.sendSuccessResponse(res, pizza, message);
    },
    getAllIngredients: async (req,res) => {
        const ingredients = await pizzaService.getAllIngredients();

        const message = `Tous les ingrédients ont bien été trouvées`;
        return responseSender.sendSuccessResponse(res, ingredients, message);
    },
    createNewIngredient: async (req,res) => {
        const { name: ingredientName } = req.body;

        const ingredient = await pizzaService.createNewIngredient(ingredientName);

        const message = `L'ingrédient à bien été crée.`;
        return responseSender.sendSuccessResponse(res, ingredient, message);
    },
    createNewPizza: async (req,res) => {
        const { name: pizzaName, price, is_offer, ingredients: ingredientNames } = req.body;

        const newPizza = await pizzaService.createNewPizza(pizzaName, price, is_offer, ingredientNames);

        const message = `La pizza '${pizzaName}' a bien été créée.`;
        return responseSender.sendSuccessResponse(res, newPizza, message);
    },
    changeIngredientById: async (req,res) => {
        const ingredientId = req.params.id;
        const {name: newName} = req.body;

        const newIngredient = await pizzaService.changeIngredientName(ingredientId, newName);

        const message = `Le nom de l'ingrédient No '${ingredientId}' a bien été changé.`;
        return responseSender.sendSuccessResponse(res, newIngredient, message);
    },
    deletePizza: async (req,res) => {
        const pizzaId = req.params.id;

        const deletedPizza = await pizzaService.deletePizzaById(pizzaId);

        if (deletedPizza) {
            const message = `La pizza '${pizzaId}' a bien été supprimée.`;
            return responseSender.sendSuccessResponse(res, { id: pizzaId }, message, 200);
        }
    },
    deleteIngredient: async (req,res) => {
        const ingredientId = req.params.id;

        const deletedIngredient = await pizzaService.deleteIngredientById(ingredientId);

        if (deletedIngredient) {
            const message = `L'ingrédient avec l'ID '${ingredientId}' a bien été supprimée.`;
            return responseSender.sendSuccessResponse(res, ingredientId, message, 200);
        }
    },
    changePizzaById: async (req, res) => {
        const pizzaId = req.params.id === undefined ? req.body.id : req.params.id;
        const pizzaNewId = req.body.new_id === undefined ? null : req.body.new_id;
        const pizzaName = req.body.name === undefined ? null : req.body.name;
        const pizzaPrice = req.body.price === undefined ? null : req.body.price;
        const pizzaIngredients = req.body.ingredients === undefined ? null : req.body.ingredients;

        if (!pizzaId && !pizzaNewId && !(pizzaName || pizzaPrice || pizzaIngredients)) {
            const err = new Error(`L'ID de la pizza est requis.`);
            err.code = 400;
            throw err;
        }

        const isDaily = req.params.id === undefined ? 1 : 0;
        const changedPizza = await pizzaService.changePizza(isDaily, pizzaId, pizzaNewId, pizzaName, pizzaPrice, pizzaIngredients);

        let message;
        if (pizzaNewId || isDaily){
            message = `La pizza du jour a bien été modifiée.`;
        } else if (changedPizza) {
            message = `La pizza ${pizzaId} a bien été modifiée.`;
        }
        return responseSender.sendSuccessResponse(res, pizzaId, message);
    },
};

export default pizzaController;
