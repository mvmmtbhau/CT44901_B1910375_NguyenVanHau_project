import instance from './api.service';

class PositionService {
    constructor() {
        this.api = instance;
    }

    async addNew(data) {
        return (this.api.post('/position/add', data))
    }

    async getAll(page, per_page, sortBy, searchText) {
        return (await this.api.get(`/position?page=${page}&per_page=${per_page}&sort_by=${sortBy}&search_text=${searchText}`));
    }

    async getPositions() {
        return (this.api.get('/position/all'))
    }

    async getById(positionId) {
        return (await this.api.get(`/position/${positionId}`));
    }

    async updateById(positionId, data) {
        return (await this.api.patch(`/position/update/${positionId}`, data));
    }

    async deletePositionById(positionId) {
        return (await this.api.delete(`/position/delete/${positionId}`));
    }
}

export default new PositionService();