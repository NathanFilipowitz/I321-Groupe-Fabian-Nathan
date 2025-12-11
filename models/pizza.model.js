import db from '../db/db.js'

const pizzaModel = {
    findPizzaByIdInDb: async (id) => {
        let con;
        try {
            con = await db.connectToDB()
            const rows = await con.query('SELECT * FROM pizzas where id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error("Error fetching pizza by ID:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    findAllPizzasInDb: async () => {
        let con;
        try {
            con = await db.connectToDB()
            const rows = await con.query('SELECT * FROM pizzas');
            return rows[0];
        } catch (error) {
            console.error("Error All pizzas:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    findPizzaIdOfTheDayInDb: async () => {
        let con;
        try {
            con = await db.connectToDB()
            const rows = await con.query('SELECT * FROM pizza_of_the_day');
            return rows[0]
        } catch (error) {
            console.error("Error Id Pizza of the day:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    findIngredientByIdInDb: async (id) => {
        let con;
        try {
            con = await db.connectToDB()
            const rows = await con.query('SELECT * FROM ingredients where id = ?', [id]);
            return rows[0]
        } catch (error) {
            console.error("Error in ingredients:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    findIngredientByNameInDb: async (name) => {
        let con;
        try {
            con = await db.connectToDB();
            const rows = await con.query('SELECT * FROM ingredients WHERE name = ?', [name]);
            return rows[0];
        } catch (error) {
            console.error(`Error fetching ingredient by name: ${name}`, error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    findIngredientsByPizzaIdInDb: async (id) => {
        let con;
        try {
            con = await db.connectToDB()
            const rows = await con.query('SELECT * FROM pizzas_has_ingredients where pizzas_id = ?',[id]);
            console.log(rows[0])
            return rows[0]
        } catch (error) {
            console.error(`Error fetching ingredients for pizza ID ${id}:`, error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    findAllIngredientsInDb: async (id) => {
        let con;
        try {
            con = await db.connectToDB()
            const rows = await con.query('SELECT * FROM ingredients');
            console.log(rows[0])
            return rows[0]
        } catch (error) {
            console.error("Error in ingredients:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    createNewIngredientInDb: async (name) => {
        let con;
        try {
            con = await db.connectToDB();
            const sql = 'INSERT INTO ingredients (name) VALUES (?)';
            const result = await con.query(sql, [name]);

            // Also fetch the newly created ingredient to return it
            const newIngredient = await pizzaModel.findIngredientByIdInDb(result.insertId);
            return newIngredient;
        } catch (error) {
            console.error(`Error creating ingredient with name ${name}:`, error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    createNewPizzaInDb: async (name) => {
        let con;
        try {
            con = await db.connectToDB();
            const sql = 'INSERT INTO pizzas (name) VALUES (?)';
            const result = await con.query(sql, [name]);
            return result.insertId; // Return the ID of the newly created pizza
        } catch (error) {
            console.error(`Error creating pizza with name ${name}:`, error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    addIngredientToPizzaInDb: async (pizzaId, ingredientId) => {
        let con;
        try {
            con = await db.connectToDB();
            const sql = 'INSERT INTO pizzas_has_ingredients (pizzas_id, ingredients_id) VALUES (?, ?)';
            const result = await con.query(sql, [pizzaId, ingredientId]);
            return result;
        } catch (error) {
            console.error(`Error adding ingredient ${ingredientId} to pizza ${pizzaId}:`, error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    deletePizzaInDb: async (id) => {
        let con;
        try {
            con = await db.connectToDB();
            const sql = 'DELETE FROM pizzas WHERE id = ?';
            return await con.query(sql, [id]);
        } catch (error) {
            console.error(`Error deleting pizza ${id}: `, error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    deletePizzaHasIngredientInDb: async (id) => {
        let con;
        try {
            con = await db.connectToDB();
            const sql = 'DELETE FROM pizzas_has_ingredients WHERE pizzas_id = ?';
            return await con.query(sql, [id]);
        } catch (error) {
            console.error(`Error deleting pizza ${id}: `, error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    deleteIngredientInDb: async (id) => {
        let con;
        try {
            con = await db.connectToDB();
            const sql = 'DELETE FROM ingredients WHERE id = ?';
            return await con.query(sql, [id]);
        } catch (error) {
            console.error(`Error deleting ingredient ${id}: `, error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    deleteIngredientHasPizzaInDb: async (id) => {
        let con;
        try {
            con = await db.connectToDB();
            const sql = 'DELETE FROM pizzas_has_ingredients WHERE ingredients_id = ?';
            return await con.query(sql, [id]);
        } catch (error) {
            console.error(`Error deleting pizza ${id}: `, error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    }
};

export default pizzaModel;