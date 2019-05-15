
const SSE = require('express-sse'); //Server-side events
const M = require('./model');
const STREAM = new SSE();

exports.middleware = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers',
	           'Origin, Content-Type, Accept');
    res.header('Cache-Control', 'no-cache');

	//log message

	console.log(Date(), req.method, req.url);

	//Check access policy here

	next();
};

exports.eventStream = (req, res) => {

  console.log('Nueva conexion SSE ... Servidor Save&Safe activo!');

  STREAM.init(req, res);

};

/*//STREAM.init(req, res)
//Funcionalidad añadir
exports.addUser = (req, res) => {
    return M.createUser(req.body).then(data => {

        console.log('Creando usuario', data);

        STREAM.send(JSON.stringify({
            userId: data.userId,
            givenName: data.givenName,
            familyName: data.familyName,
            gender: data.gender
        }), 'updates', 0);

        res.send({result: 'OK'})
    });
};

exports.addDoctor = (req, res) => {
    return M.createDoctor(req.body).then(data => {

        console.log('Creando personal médico', data);

        STREAM.send(JSON.stringify({
            doctorId: data.doctorId,
            hospitalAffiliation: data.hospitalAffiliation,
            medicalSpecialty: data.medicalSpecialty
        }), 'updates', 0);

        res.send({result: 'OK'})
    });
};

exports.addPatient = (req, res) => {
    return M.createPatient(req.body).then(data => {

        console.log('Creando paciente', data);

        STREAM.send(JSON.stringify({
            patientId: data.patientId,
            healthCondition: data.healthCondition,
            drug: data.drug
        }), 'updates', 0);

        res.send({result: 'OK'})
    });
};

exports.createReport = (req, res) => {
    return M.createReport(req.body).then(data => {

        console.log('Creando informe', data);

        STREAM.send(JSON.stringify({
            reportNumber: data.reportNumber,
            doctorId: data.doctorId,
            patientId: data.patientId,
            backstory: data.backstory,
            reportBody: data.reportBody
        }), 'update', 0);

        res.send({result: 'OK'})
    });
};*/

exports.principal = (req, res) => {

};

//Funcionalidad añadir
//Usuarios Normales
exports.addUser = (req, res) => {
    M.addUser(req.body).then(function(data){
        res.send(data.data.id);
    });
};

//Funcionalidad listar
//Usuarios normales
exports.getUsers = (req,res) => {
    M.getUsers().then(function(data){
        res.send(data.data);
    });
};

exports.getUser = (req, res) => {
    let cadena = "";
    M.getUser(req.params.userId).then(data => {
        cadena += "userId: " + data.data._id + " - rev: " + data.data._rev + " - givenName: " + data.data.givenName + " - familyName: " + data.data.familyName + " - email: " + data.data.email;
        res.send(cadena);
    });
};

//Funcionalidad modificar
exports.updateUser = (req, res) => M.updateUser(req.params.userId, req.body).then( data => {
    console.log(data);
    res.send({result: 'OK'})
});

//Funcionalidad borrar
exports.deleteUser = (req, res) => {
    M.deleteUser(req.params.userId, req.params.rev).then(function(data){
        res.send(data);
    });
};
/*
//Personal médico
exports.getDoctors = (req, res) => {
    return M.getDoctors().then(data => res.send({result: data}));
};

exports.getDoctor = (req, res) => res.send({result:M.getDoctor(req.params.doctorId)});

//Pacientes
exports.getPatients = (req, res) => {
    return M.getPatients.then(data => res.send({result: data}));
};

exports.getPatient = (req, res) => res.send({result:M.getPatient(req.params.patientId)});

//Informes
exports.getReports   = (req,res) => M.getReports().then(data => res.send({result: data}));

exports.getReportData = (req,res) => res.send({result:M.getReportData(req.params.reportNumber)});

exports.getReportsByDoctor   = (req,res) => res.send({result:M.getReportsByDoctor(req.params.doctorId)});

exports.getReportsByPatient   = (req,res) => res.send({result:M.getReportsByPatient(req.params.patientId)});

//exports.getReportsByBoth   = (req,res) => res.send({result:M.getReportsByPatient(req.params.doctorId, req.params.patientId)});

exports.searchReport = (req, res) => M.searchReport(req.query.q)
    .then(r => res.send({result: req.query.q}));

exports.updateReport = (req, res) => M.updateReport(req.params.doctorId, req.params.reportNumber, req.body)
    .then(data => res.send({result: data}));
 */


