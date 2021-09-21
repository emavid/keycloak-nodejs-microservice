const session = require('express-session');
const Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    clientId: 'nodejs-microservice',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080/auth',
    realm: 'Demo-Realm',
    Credential: {
        secret: '11413081-f507-494a-9881-4ecff84ff741'
    }
};

function initKeycloak(){
    if(_keycloak){
        console.warn("trying to init Keycloak again!");
        return _keycloak
    }
    else{
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
};

function getKeycloak(){
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    }
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};