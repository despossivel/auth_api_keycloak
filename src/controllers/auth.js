import {
    signupSchema,
    authSchema,
    resetPasswordSchema,
    updateSchema
} from "../validation/joi.js"
import KeycloakAPI from "../services/keycloak.js"

const keycloak = new KeycloakAPI()

function handleRequestError(res, error) {
    res.status(error.response.status).json(error.response.data);
}


async function auth(req, res) {
    const { error } = authSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const response = await keycloak.auth(req.body);

        const { name, given_name,  family_name,preferred_username, email, email_verified, username, active, sub } = await keycloak.userInspect({
            token: response.access_token,
            realm: process.env.OIDC_REALM
        })
      
        response.user = {name, given_name,  family_name,preferred_username, email, email_verified, username, active, sub }

        
        res.json(response);
    } catch (error) {
        return handleRequestError(res, error)
    }
}

async function signup(req, res) {
    try {
        const { error } = signupSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const response = await keycloak.createUser(req.body)
        res.json(response);
    } catch (error) {
        return handleRequestError(res, error)
    }
}

async function update(req, res) {
    try {
        if (!req.params.user_id) return res.status(404).send('Usuário não encontrado.');
        const { error } = updateSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const response = await keycloak.updateUser(req.body)
        res.json(response);
    } catch (error) {
        return handleRequestError(res, error)
    }
}

async function resetPassword(req, res) {
    try {
        if (!req.params.user_id) return res.status(404).send('Usuário não encontrado.');
        const { error } = resetPasswordSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const data = req.body
        data.value = req.body.value
        data.type = "password"
        data.temporary = false
        const response = await keycloak.resetPassword(req.params.user_id, data)
        res.json(response);
    } catch (error) {
        return handleRequestError(res, error)
    }
}

export {
    auth,
    signup,
    update,
    resetPassword
}