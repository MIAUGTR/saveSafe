const axios = require('axios');

let client = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000,
});

client.get("/users").then(response => console.log("\nMostrando todos los usuarios \n" + response.data))
    .catch(error => console.log(error));

client.put("/user/update/b05fd6a15feef248fcf8426d7201a488", {
    "id": "b05fd6a15feef248fcf8426d7201a488",
    "rev": "1-3413ae442de16e21bfb8860a087caae2",
    "givenName": "Alexandru",
    "familyName": "Valeanu",
    "telephone": "642818720",
    "email": "al315550@uji.es"
}).then(response => console.log("\nModificando al usuario :: => " + JSON.stringify(response.data)))
 .catch(error => console.log(error));

client.get("/user/b05fd6a15feef248fcf8426d720196cc").then(response => console.log("\nMostrando un usuario \n" + response.data))
    .catch(error => console.log(error));

client.post("/user/delete/b05fd6a15feef248fcf8426d7200be34", {
    "id" : "b05fd6a15feef248fcf8426d7200be34",
    "rev": "8-e128ed179da0fba3d6c015cac56bc816"
}).then(response => console.log("\nEliminando al usuario :: => " + JSON.stringify(response.data)))
    .catch(error => console.log(error));

