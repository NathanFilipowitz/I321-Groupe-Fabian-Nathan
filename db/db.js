import mysql from 'mysql2/promise';

const db = {
    connectToDB: async () => {
        console.log(process.env.PSEUDO)
        let con = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.PSEUDO,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        })
        console.log("Connected to database");
        return con;
    },

    disconnectToDB: async (con) => {
        try {
            await con.end();
            console.log("Disconnected from database");
        } catch (error) {
            console.error("Error disconnecting from database:", error);
        }
    },
}

export default db;