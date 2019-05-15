// Import section
const bodyparser = require('body-parser');
const express    = require('express');
const control    = require('./controllers');
const path       = require('path');

//Express Web Server object
const app = express();

//HTTP Body parsers for JSON
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//Middleware
app.use(control.middleware);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Routes of our REST service
app.use('/web', express.static('public'));

app.get('/news', control.eventStream); //Server-side events

//POST - AÑADIR
app.post('/user/add', control.addUser)
/*
app.post('/doctor', control.addDoctor);

app.post('/patient', control.addPatient);

app.post('/report', control.createReport);*/

//GET - LISTAR
app.get('/users', control.getUsers);

app.get('/user/:userId', control.getUser);
/*
app.get('/doctors/', control.getDoctors);

app.get('/doctor/:doctorId', control.getDoctor);

app.get('/patients/', control.getPatients);

app.get('/patient/:patientId', control.getPatient);

app.get('/reports', control.getReports);

app.get('/report/:reportNumber', control.getReportData);

app.get('/report/search', control.searchReport); //?q=motos

app.get('/reports/doctor/:doctorId', control.getReportsByDoctor);

app.get('/reports/patient/:patientId', control.getReportsByPatient);

//app.get('/reports/both/:doctorId, :patientId', control.getReportsByBoth);
*/
//PUT - MODIFICAR
app.post('/user/update/:userId', control.updateUser);

//app.put('/report/:reportNumber', control.updateReport);

//DELETE - BORRAR
app.post('/user/delete/:userId:rev', control.deleteUser);


//Run server
const PORT = 8000
app.listen(PORT, _ => console.log(`Servidor web escuchando en puerto ${PORT}`));
