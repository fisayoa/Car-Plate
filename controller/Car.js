const db = require('../config/db');

const Create = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Car image is not uploaded.');
    }
    const { car_model, plate_number, engine_number, year } = req.body;

    let file = req.files.image;
    let uploadPath = __dirname + '/../public/img/' + file.name;
    console.log(uploadPath);
    let file_name = '/img/' + file.name;

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, async function(err) {
        if (err) return res.status(500).send(err);

        const [ result ] = await db.execute(`
            INSERT INTO cars (car_model, plate_number, engine_number, year, image) 
            VALUES (?, ?, ?, ?, ?)`, 
            [car_model, plate_number, engine_number, year, file_name]
        );
        if(result) {
            res.status(200).send('Car added successfully');
        } else {
            res.status(200).send('Something went wrong');
        }
    });
};

const Fetch = async (req, res) => {
    const { keyword } = req.query;
    const [rows, fields] = await db.execute(`SELECT * FROM cars WHERE car_model LIKE %${keyword}% OR plate_number LIKE %${keyword}% OR engine_number LIKE %${keyword}% OR year LIKE %${keyword}%`, []);
    res.render('details', { rows });
};

module.exports = {
    Create,
    Fetch
}