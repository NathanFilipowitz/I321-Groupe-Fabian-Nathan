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
            console.log(rows[0])
            return rows[0]
        } catch (error) {
            console.error("Error in ingredients:", error);
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
            console.error("Error Id Pizza of the day:", error);
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
    }
};

export default pizzaModel;