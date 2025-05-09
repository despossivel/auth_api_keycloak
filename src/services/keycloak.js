import axios from 'axios';

export default class KeycloakAPI {
    constructor() {
        this.HOST = process.env.OIDC_AUTH_SERVER_URL;
        this.baseURL = `${this.HOST}/admin/realms/${process.env.OIDC_REAL}/`;
    }

    async auth({
        username,
        password
    }) {
        const response = await this.getToken({
            realm: process.env.OIDC_REALM,
            username,
            password

        })
        return response
    }

    async getToken({
        realm, username, password
    }) {
        const url = `${this.HOST}/realms/${realm}/protocol/openid-connect/token`;
        const data = {
            username: username,
            password: password,
            grant_type: 'password',
            client_id: 'admin-cli'
        };

        const response = await axios.post(url, this.transformToFormData(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'authapi/0.0.1'
            }
        });

        return response.data;
    }

    async getUserById(userId) {
        const url = `${this.baseURL}users/${userId}`;
        const response = await this.sendAuthorizedRequest('GET', url);
        return response.data;
    }

    async createUser(user) {
        const url = `${this.baseURL}users`;
        const response = await this.sendAuthorizedRequest('POST', url, user);

        return response.data;
    }


    async userInspect({token, realm}) {
   
        const url = `${this.HOST}/realms/${realm}/protocol/openid-connect/token/introspect`;
  
        const response = await axios.post(url, this.transformToFormData({
            token: token,
            client_id: process.env.OIDC_RESOURCE,
            client_secret: process.env.OIDC_SECRET
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'authapi/0.0.1'
            }
        });
 
        return response.data;
    }

    async updateUser(userId, updateData) {
        const url = `${this.baseURL}users/${userId}`;
        const response = await this.sendAuthorizedRequest('PUT', url, updateData);

        return response.data;
    }

    async resetPassword(userId, newPassword) {
        const url = `${this.baseURL}users/${userId}/reset-password`;
        const resetData = {
            type: 'password',
            value: newPassword,
            temporary: false
        };

        const response = await this.sendAuthorizedRequest('PUT', url, resetData);

        return response.data;
    }


    async sendAuthorizedRequest(method, url, data = null) {
        const { access_token } = await this.getToken({
            realm: 'master',
            username: 'authapi',
            password: 'authapi@123speaker'

        })

        const requestOptions = {
            method: method,
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        };

        const response = await axios(requestOptions);
        return response;
    }

    transformToFormData(data) {
        return Object.keys(data)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
            .join('&');
    }
}
