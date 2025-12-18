import db from '../db/db.js'

const pizzaModel = {
    findPizzaByIdInDb: async (id) => {
        let con;
        try {
            con = await db.connectToDB()
            const [rows] = await con.query('SELECT * FROM pizzas where id = ?', [id]);
            return rows;
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
            const [rows] = await con.query('SELECT * FROM pizzas');
            return rows;
        } catch (error) {
            console.error("Error All pizzas:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    findDailyPizzaIdInDb: async () => {
        let con;
        try {
            con = await db.connectToDB()
            const [rows] = await con.query('SELECT * FROM pizzas WHERE is_offer = 1');
            if (rows.length === 0) {
                const err = new Error(`Aucune pizza du jour n'a été trouvée.`);
                err.code = 404;
                throw err;
            }
            return rows[0].id;
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
            const [rows] = await con.query('SELECT * FROM ingredients where id = ?', [id]);
            return rows;
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
            const nameSearch = `'${name}'`
            const sql = 'SELECT * FROM ingredients WHERE name LIKE ' + nameSearch + ';';
            const [rows] = await con.query(sql);

            return rows;
        } catch (error) {
            console.error(`Error fetching ingredient by name: ${name}`, error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    findAllIngredientsInDb: async () => {
        let con;
        try {
            con = await db.connectToDB()
            const [rows] = await con.query('SELECT * FROM ingredients');

            return rows;
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
            const [result] = await con.query(sql, [name]);
            // const newIngredient = await pizzaModel.findIngredientByIdInDb(result.insertId);
            return result.insertId;
        } catch (error) {
            console.error(`Error creating ingredient with name ${name}:`, error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    createNewPizzaInDb: async (name, price) => {
        let con;
        try {
            con = await db.connectToDB();
            const sql = 'INSERT INTO pizzas (name, price, is_offer) VALUES (?, ?, 0)';
            const [rows] = await con.query(sql, [name, price]);

            return rows.insertId;
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
            const [rows] = await con.query(sql, [pizzaId, ingredientId]);

            return rows;
        } catch (error) {
            console.error(`Error adding ingredient ${ingredientId} to pizza ${pizzaId}:`, error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    changeIngredientNameByIdInDb: async (ingredientId, newName) => {
        let con;
        try {
            con = await db.connectToDB();
            const sql = 'UPDATE ingredients SET name = ? WHERE id = ?';
            const [rows] = await con.query(sql, [newName, ingredientId])

            return rows.changedRows;
        } catch (error) {
            console.error(`Error changing the name of ingredient No ${ingredientId} to ${newName}:`, error);
        } finally {
            await db.disconnectToDB(con);
        }
    },
    changePizzaByIdInDb: async (isDaily, id, name = null, price = null) => {
        let con;
        try {
            con = await db.connectToDB();
            let sql = 'UPDATE pizzas SET';
            let params = [];

            if (name) {
                sql += " name = ?";
                params.push(name);
            }
            if (price) {
                sql += ", price = ?";
                params.push(price);
            }
            if (isDaily) {
                sql += " WHERE is_offer = 1";
            } else {
                sql += " WHERE id = ?";
                params.push(id);
            }
            const [rows] = await con.query(sql, params);
            return rows.changedRows;
        } catch (error) {
            console.error(`Error changing the daily pizza ${name}:`, error);
        } finally {
            await db.disconnectToDB(con);
        }
    },
    changeDailyPizzaInDb: async (id) => {
        let con;
        try {
            con = await db.connectToDB();
            // Remove old offer
            const oldSql = 'UPDATE pizzas set is_offer = 0 WHERE is_offer = 1';
            await con.query(oldSql);

            // Add new offer
            const newSql = 'UPDATE pizzas set is_offer = 1 WHERE id = ?';
            const [newRows] = await con.query(newSql, [id]);
            return newRows;
        } catch (error) {
            console.error(`Error updating daily pizza ${id}: `, error);
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
            const [rows] = await con.query(sql, [id]);
            return rows;
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
            const [rows] = await con.query(sql, [id]);
            return rows;
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
            const [rows] = await con.query(sql, [id]);
            return rows.affectedRows;
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
            const [rows] = await con.query(sql, [id]);
            return rows.affectedRows;
        } catch (error) {
            console.error(`Error deleting pizza ${id}: `, error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
};

export default pizzaModel;