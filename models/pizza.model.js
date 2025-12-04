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
            console.log(rows[0])
            return rows[0];
        } catch (error) {
            console.error("Error All pizzas:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    }
};

export default pizzaModel;