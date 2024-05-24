const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database/db');
const userRoutes = require('./routes/userRoutes');
// const validationMiddleware = require('./validations/validation');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

sequelize.sync()
  .then(() => {
    console.log('Database and tables synchronized!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// app.use(validationMiddleware.handleValidationErrors);  

app.use('/', userRoutes);

app.listen(8080, () => console.log('Server is running on http://localhost:8080!'));




// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "myapp"
// })

// app.post('/signup', (req, res) => {
//     const sql = "insert into login ('name','email','password') values(?,?,?)";
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ]
//     db.query(sql, [values], (err, data) => {
//         if(err){
//             return res.json("Error");
//         }
//         return res.json(data);
//     })
// })

// app.post('/login', (req, res) => {
//     const sql = "select * from login where 'emai'=? and 'password'=?";
//     db.query(sql, [req.body.email, req.body.password], (err, data) => {
//         if(err){
//             return res.json("Error");
//         }
//         if(data.length > 0)
//         {
//             return res.json("Success");
//         }
//         else{
//             return res.json("Failed")
//         }
//     })
// })

// app.listen(8080, () => {
//    console.log("Server is running!"); 
// })