import instance from './api.service';

class AuthService {
    constructor() {
        this.api = instance;
    }

    async login(data){
        return (await this.api.post('/auth/login', data));
    }
    
    async register(data){
        return (await this.api.post('/auth/register', data));
    }

    async getUser(userId) {
        return (await this.api.get(`/auth/get/${userId}`));
    }
}

export default new AuthService();