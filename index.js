import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
import {
    auth,
    signup,
    update,
    resetPassword
} from "./src/controllers/auth.js"
import initKeycloak from "./src/services/keycloak-connect.js" 


(async () => {
    dotenv.config()

    const app = express()

    let keycloak = initKeycloak(app, {
        clientId: process.env.OIDC_RESOURCE,
        bearerOnly: true,
        serverUrl: process.env.OIDC_AUTH_SERVER_URL,
        realm: process.env.OIDC_REALM,
        credentials: {
            secret: process.env.OIDC_SECRET,
        }
    })
 
    app.use([
        cors(),
        express.json()
    ]);

    app.post('/auth', auth);

    app.post('/signup', signup);

    app.put('/reset/password/:user_id', keycloak.protect(), resetPassword);

    app.put('/update/user/:user_id', keycloak.protect(), update);

    app.listen(process.env.PORT | 3008, () => console.log(`Servidor rodando na porta ${process.env.PORT | 3008}...`));

})()