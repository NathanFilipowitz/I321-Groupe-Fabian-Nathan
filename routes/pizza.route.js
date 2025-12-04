import {Router} from 'express';
import pizzaController from '../controllers/pizza.controller.js';
import asyncHandler from "../helpers/asyncRouteHandler.helper.js";

const router = Router();

// Utilisez le wrapper asyncHandler
router.get('/pizzas', asyncHandler(pizzaController.getAllPizzas));
router.get('/pizzas/:id', asyncHandler(pizzaController.getPizzaById));
router.get('/daily', asyncHandler(pizzaController.getPizzaOfTheDay));

// router.post("/", asyncHandler(pizzaController.createNewPost));
// router.put("/",asyncHandler(pizzaController.updatePost));
// router.delete("/:postId", asyncHandler(pizzaController.deletePost));
// router.get("/", asyncHandler(pizzaController.getAllUserPosts));

export default router;