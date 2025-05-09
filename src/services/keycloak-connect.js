import Keycloak from 'keycloak-connect';
import session from 'express-session'

function initKeycloak(app, keycloakConfig) {
    let _keycloak
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!")
        return _keycloak
    }
    else {
        console.log("Initializing Keycloak...")
        const memoryStore = new session.MemoryStore()
        app.use(session({
            secret: keycloakConfig.credentials.secret,
            resave: false,
            saveUninitialized: true,
            store: memoryStore
        }))
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig)
        console.log("Keycloak Initialized.")
        return _keycloak
    }
}

export default initKeycloak;