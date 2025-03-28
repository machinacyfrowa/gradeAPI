const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
//app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/grades/:student_id/', (req, res) => {
    const studentId = req.params.student_id;
    console.log("Student ID:", studentId);
    res.end();
});
app.post('/grades/:student_id/', (req, res) => {
    const studentId = req.params.student_id;
    console.log("Student ID:", studentId);
    console.log("Request Body:", req.body);
    res.end();
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 