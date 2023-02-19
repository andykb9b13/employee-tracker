const express = require('express');
const path = require('path');
const mysql = require('mysql2')

const app = express();

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: "thelastwitch6",
        db: "employees_db"
    }
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.get('*', (req, res) => res.json('Please use one of the other routes'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

