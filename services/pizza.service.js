import pizzaModel from '../models/pizza.model.js';
// import { exceptionGenerator } from '../helpers/exception-generator.js';

const pizzaService = {
    getPizzaById: async (id) => {

        const pizza = await pizzaModel.findPizzaByIdInDb(id);

        if (!pizza) {
            // throw exceptionGenerator(`La pizza avec l'id ${id} n'existe pas !`, 404);
            console.log(`Erreur [Code: ${id}]:`, pizza);
        }

        return pizza;
    },
};

export default pizzaService;