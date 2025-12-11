import pizzaService from '../services/pizza.service.js';
import responseSender from '../helpers/responseSender.js';

const pizzaController = {
    getPizzaById: async (req, res) => {
        const pizzaId = req.params.id;

        const pizza = await pizzaService.getPizzaById(pizzaId);

        if (pizza){
            const message = `La pizza avec l'id ${pizzaId} a bien été trouvé !`;
            return responseSender.sendSuccessResponse(pizza, message);
        } else {
            
        }

    },
    getAllPizzas: async (req,res) => {
        const pizzas = await pizzaService.getAllPizzas();

        const message = `Toutes les pizzas ont bien été trouvées`;
        return responseSender.sendSuccessResponse(pizzas, message);
    }
};

export default pizzaController;