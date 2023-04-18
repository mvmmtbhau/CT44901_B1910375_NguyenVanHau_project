import instance from './api.service';

class RoomService {
    constructor() {
        this.api = instance;
    }

    async addNew(data) {
        return (await this.api(
            {
                method: 'POST',
                url: "/room/add",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: data
            }
        ));
    }

    async getAll(page, per_page, sortBy, searchText) {
        return (await this.api.get(`/room?page=${page}&per_page=${per_page}&sort_by=${sortBy}&search_text=${searchText}`));
    }

    async getById(roomId) {
        return (await this.api.get(`/room/${roomId}`));
    }

    async update(roomId, data) {
        return (await this.api.patch(`/room/update/${roomId}`, data));
    }

    async deleteRoom(roomId) {
        return (await this.api.delete(`/room/delete/${roomId}`));
    }
}

export default new RoomService();