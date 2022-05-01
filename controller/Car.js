const mysql = require('mysql2/promise');

// create the connection to database
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

const Create = async (req, res) => {
    const { car_model, plate_number, engine_number, year } = req.body;
    const [ result ] = await connection.execute(`INSERT INTO cars (car_model, plate_number, engine_number, year) VALUES (?, ?, ?, ?)`, [car_model, plate_number, engine_number, year]);
    if(result) {
        res.render('success');
    } else {
        res.render('index', { error: 'Something went wrong' });
    }
};

const Fetch = async (req, res) => {
    const { keyword } = req.query;
    const [rows,fields] = await connection.execute(`SELECT * FROM cars WHERE car_model LIKE %${keyword}% OR plate_number LIKE %${keyword}% OR engine_number LIKE %${keyword}% OR year LIKE %${keyword}%`, []);
    res.render('details', { rows });
};

module.exports = {
    Create,
    Fetch
}