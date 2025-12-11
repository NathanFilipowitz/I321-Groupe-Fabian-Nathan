import {Router} from 'express';
import pizzaController from '../controllers/pizza.controller.js';
import asyncHandler from "../helpers/asyncRouteHandler.helper.js";

const router = Router();

router.get('/pizzas', asyncHandler(pizzaController.getAllPizzas));
router.get('/pizzas/:id/ingredients', asyncHandler(pizzaController.getIngredientsByPizzaId));
router.get('/pizzas/:id', asyncHandler(pizzaController.getPizzaById));
router.get('/ingredients', asyncHandler(pizzaController.getAllIngredients));
router.get('/ingredients/:id', asyncHandler(pizzaController.getIngredientById));
router.get('/daily', asyncHandler(pizzaController.getPizzaOfTheDay));

router.post('/ingredients', asyncHandler(pizzaController.createNewIngredient));
router.post('/pizzas', asyncHandler(pizzaController.createNewPizza));

router.patch('/pizzas/:id/price', asyncHandler(pizzaController.changePizzaPrice));
router.patch('/ingredients/:id', asyncHandler(pizzaController.changeIngredientById));

export default router;
