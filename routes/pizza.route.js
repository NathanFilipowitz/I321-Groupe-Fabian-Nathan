import {Router} from 'express';
import pizzaController from '../controllers/pizza.controller.js';
import asyncHandler from "../helpers/asyncRouteHandler.helper.js";

const router = Router();

router.get('/pizzas', asyncHandler(pizzaController.getAllPizzas));
router.get('/pizzas/:id', asyncHandler(pizzaController.getPizzaById));
router.get('/ingredients', asyncHandler(pizzaController.getAllIngredients));
router.get('/pizza-du-jour', asyncHandler(pizzaController.getPizzaOfTheDay));
// router.get('/pizzas/:id/ingredients', asyncHandler(pizzaController.getIngredientsByPizzaId));
// router.get('/ingredients/:id', asyncHandler(pizzaController.getIngredientById));

router.post('/pizzas', asyncHandler(pizzaController.createNewPizza));
router.post('/ingredients', asyncHandler(pizzaController.createNewIngredient));
router.post('/pizza-du-jour', asyncHandler(pizzaController.createNewDailyPizza));

router.put('/pizza/:id', asyncHandler(pizzaController.changePizzaById));
router.put('/ingredients/:id', asyncHandler(pizzaController.changeIngredientById));
router.put('/pizza-du-jour', asyncHandler(pizzaController.changeDailyPizzaById));
// router.patch('/pizzas/:id/price', asyncHandler(pizzaController.changePizzaPrice));

router.delete('/pizzas/:id', asyncHandler(pizzaController.deletePizza));
router.delete('/ingredients/:id', asyncHandler(pizzaController.deleteIngredient));

export default router;
