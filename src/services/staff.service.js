import instance from './api.service';

class PositionService {
    constructor() {
        this.api = instance;
    }

    async addNew(data) {
        return (await this.api(
            {
                method: 'POST',
                url: "/staff/add",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: data
            }
        ));
    }

    async getAll(page, per_page, sortBy, searchText) {
        return (await this.api.get(`/staff?page=${page}&per_page=${per_page}&sort_by=${sortBy}&search_text=${searchText}`));
    }

    async getById(staffId) {
        return (await this.api.get(`/staff/${staffId}`));
    }

    async updateStaff(staffId, data) {
        return (await this.api(
            {
                method: 'PATCH',
                url: `/staff/update/${staffId}`,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: data
            }
        ));
    }

    async deleteStaff(staffId) {
        return (await this.api.delete(`/staff/delete/${staffId}`));
    }
}

export default new PositionService();