const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: "thelastwitch6",
        database: "employees_db"
    },
    console.log("connected to the employees_db database")
);

class dbQueries {
    constructor() { }

    viewDepartments() {
        db.query('SELECT * FROM departments', function (err, results) {
            if (err) {
                console.log(err);
                return
            }
            return results
        })
    }
}

module.exports = dbQueries;