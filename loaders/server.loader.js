import express from 'express';
import pizzaRoutes from '../routes/pizza.route.js';
import errorHandler from '../middlewares/errorHandler.middleware.js';

export default function serverLoader(app) {
    //middlewares
    app.use(express.static("public"));
    app.use(express.json());

    //routes
    app.use("/api/pizza", pizzaRoutes);
    // app.use("/api/user", userRoutes);

    //error handling middleware
    app.use(errorHandler);
};