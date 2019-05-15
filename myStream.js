const _ = require('lodash');

//DATABASE
//User   {id: int, name: String , email: String}
//Reports   {id: int, information: String , author: User.id}
//ReportsUser  {'userId':{'report1': .., 'report2': ...}}

let Users = {};
let Doctors = {};
let Patients = {};
let Reports = {};

//Funcionalidad añadir
exports.createUser = data =>
    new Promise((accept, reject) => {
        //check if user data is right
        if (Users[data.userId] === data) {
            reject("Ya existe un usuario con los mismos datos")
        }
        if (data !== '') {
            Users[data.userId] = data
            accept(data)
        } else {
            accept(false)
        }
    });

exports.createDoctor = data =>
    new Promise((accept, reject) => {
        //check if doctor data is correct
        if (Doctors[data.doctorId] === data) {
            reject("Ya existe un personal sanitario con los mismos datos")
        }
        if (data !== '') {
            accept(data)
        } else {
            reject("No se han insertado datos")
        }
    });

exports.createPatient = data =>
    new Promise( (accept, reject) => {
        //check if the patient data is correct
        if(Patients[data.patientId] === data) {
            reject("Ya existe un paciente con los mismos datos")
        }
        if (data !== '') {
            accept(data)
        } else {
            reject("No se han insertado datos")
        }
    });

exports.createReport = data =>
    new Promise((accept, reject) => {
        //check if report data is right
        if (Reports[data.reportNumber] === data) {
            reject("Ya existe un informe con los mismos datos")
        }
        if (data !== '') {
            Reports[data.reportNumber] = data
            accept(data)
        } else {
            accept(false)
        }
    });


//Funcionalidad listar
//Usuarios normales
exports.getUsers = _ => {
    return new Promise((accept, reject) => {
        let data = Object.keys(Users).map(k => {
            return {
                userId: Users[k].userId,
                givenName: Users[k].givenName,
                familyName: Users[k].familyName,
                gender: Users[k].gender
            }
        });
        accept(data)
    });
};

exports.getUser = id => {
    if (Users[id]) return [Users[id]];
    else return []
};

//Personal médico
exports.getDoctors = _ => {
    return new Promise((accept, reject) => {
        let data = Object.keys(Doctors).map(k => {
            return {
                doctorId: Doctors[k].doctorId,
                hospitalAffiliation: Doctors[k].hospitalAffiliation,
                medicalSpecialty: Doctors[k].medicalSpecialty
            }
        });
        accept(data)
    });
};

exports.getDoctor = id => {
    if (Doctors[id]) return [Doctors[id]];
    else return []
};

//Pacientes
exports.getPatients = _ => {
    return new Promise((accept, reject) => {
        let data = Object.keys(Patients).map(k => {
            return {
                patientId: Patients[k].patientId,
                healthCondition: Patients[k].healthCondition,
                drug: Patients[k].drug
            }
        });
        accept(data)
    });
};

exports.getPatient = id => {
    if (Patients[id]) return [Patients[id]];
    else return []
};

//Informes
exports.getReports = _ => {
    return new Promise((accept, reject) => {
        let data = Object.keys(Reports).map(k => {
            return {id: Reports[k].id, information: Reports[k].information, author: Reports[k].author}
        });
        accept(data)
    });
};

exports.getReportData = reportId => {
    if (Reports[reportId]) return [Reports[reportId]];
    else return []
};

exports.getReportsByDoctor = doctorId => {
    if (Reports[doctorId]) return [Reports[doctorId]];
    else return []
};

exports.getReportsByPatient = patientId => {
    if (Reports[patientId]) return [Reports[patientId]];
    else return []
};

/*exports.getReportsByBoth = (doctorId, patientId) => {
    if (Reports[(doctorId, patientId)]) return [Reports[(doctorId, patientId)]];
    else return []
};*/

exports.searchReport = text =>  //information includes text, return keys of Reports
    new Promise((accept, reject) => {
        let data = Object.keys(Reports).filter(k => {
            return {information: Reports[k].information.includes(text)}
        });
        accept(data)
    });

//Funcionalidad modificar
exports.updateUser = (userId, data) => new Promise((accept, reject) => {
    if (Users[userId]) {
        Users[userId] = data;
        accept(true);
    } else {
        reject("No existe el usuario");
    }
});

exports.updateReport = (doctorId, reportNumber, data) =>
    new Promise((accept, reject) => {
        if(Reports[doctorId]) {
            if (Reports[reportNumber]) {
                Reports[reportNumber] = data;
                accept(true)
            } else
                reject(false)
        }else{
            reject("Este informe sólo se puede modificar por el personal médico que lo creó");
        }
    });

//Funcionalidad borrar
exports.deleteUser = userId => {
    return new Promise((accept, reject) => {
        if (Users[userId]) {
            delete (Users[userId]);
            accept("La eliminación del usuario tuvo éxito");
        } else {
            reject("El usuario que desea eliminar no existe en la BBDD");
        }
    });
};




