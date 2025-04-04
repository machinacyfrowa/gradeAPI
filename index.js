const express = require('express');
const pg = require('pg');
const app = express();
const client = new pg.Client({
    user: 'user8', // Nazwa użytkownika bazy danych
    host: '192.168.0.207', // Adres hosta bazy danych
    database: 'user8_db', // Nazwa bazy danych
    password: 'JBKVZDPK', // Hasło użytkownika bazy danych
    port: 5432, // Port, na którym działa serwer PostgreSQL
});


app.use(express.json()); // Middleware to parse JSON request bodies
//app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// ze zbioru studentów
// dla konkretnego studenta
// jego oceny
// zwracamy (GET) oceny studenta
app.get('/students/:student_id/grades/', async (req, res) => {
    const studentId = req.params.student_id;
    console.log("Student ID:", studentId);
    const query = 'SELECT * FROM grades WHERE student_id = ' + studentId;
    const result = await client.query(query);
    console.log("Query Result:");
    console.table(result.rows);
    res.send(result.rows);
});
// ze zbioru studentów
// dla konkretnego studenta
// jego oceny
// dodajemy (POST) oceny studenta
app.post('/students/:student_id/grades/', async (req, res) => {
    const studentId = parseInt(req.params.student_id); // Parse student_id from URL parameter
    console.log("Student ID:", studentId);
    console.log("Request Body:", req.body);
    // Validate request body
    // jeżeli studentId jest null lub nie jest liczbą całkowitą lub nie jest liczbą skończoną
    if(studentId === null || !Number.isInteger(studentId) || !isFinite(studentId)) {
        //status 400 - Bad Request
        res.status(400).send('Invalid student ID');
        return;
    }
    if(req.body.course_id === null || !Number.isInteger(req.body.course_id) || !isFinite(req.body.course_id)) {
        //status 400 - Bad Request
        res.status(400).send('Invalid course ID');
        return;
    }
    if(req.body.grade === null || !Number.isInteger(req.body.grade) || !isFinite(req.body.grade)) {
        //status 400 - Bad Request
        res.status(400).send('Invalid grade');
        return;
    }
    const query = 'INSERT INTO grades (student_id, course_id, grade) VALUES ($1, $2, $3)';
    const values = [studentId, req.body.course_id, req.body.grade];
    await client.query(query, values);
    res.end();
});
app.listen(3000, async () => {
    await client.connect(); // Connect to the database
    console.log('Connected to the database');
    console.log('Server is running on port 3000');
}); 
app.on('close', async () => {
    await client.end(); // Disconnect from the database when the server closes
    console.log('Disconnected from the database');
});
