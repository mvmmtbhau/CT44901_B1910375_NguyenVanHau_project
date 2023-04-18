const roomService = require('../services/room.service');

class RoomController {
    async addNewRoom(req, res, next) {
        try {
            const data = {
                roomname: req.body.roomname,
                price: req.body.price,
                quantity: req.body.quantity,
                description: req.body.description,
                image: req.file.filename,
            }

            const isExisted = await roomService.find({
                roomname: data.roomname
            })

            if (isExisted[0]) return res.status(303).json({
                message: 'Tên phòng đã tồn tại'
            });

            const newRoom = await roomService.create(data);

            return res.status(201).json({
                newRoom: newRoom,
                message: 'Thêm phòng thành công',
            })
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getAll(req, res, next) {
        try {
            const new_per_page = req.query.per_page;
            let skipNum = (req.query.page - 1) * new_per_page;
            let sortBy;

            const pattern = "[\\s]" + req.query.search_text + "|^" + req.query.search_text;

            const filter = {
                roomname: {
                    $regex: pattern,
                    $options: 'i',
                }
            };

            if (req.query.sort_by == 0) {
                sortBy = {
                    createdAt: 'asc'
                }
            }

            if (req.query.sort_by == 1) {
                sortBy = {
                    createdAt: 'desc'
                }
            }

            if (req.query.sort_by == 2) {
                sortBy = {
                    roomname: 'asc'
                }
            }

            if (req.query.sort_by == 3) {
                sortBy = {
                    roomname: 'desc'
                }
            }

            if (req.query.sort_by == 4) {
                sortBy = {
                    price: 'desc'
                }
            }

            if (req.query.sort_by == 5) {
                sortBy = {
                    price: 'asc'
                }
            }

            const rooms = await roomService.findLimit(
                req.query.search_text == '' ? {} : filter,
                new_per_page,
                skipNum,
                sortBy);
            const totalRooms = await roomService.find(req.query.search_text == '' ? {} : filter);

            const totalPage = Math.ceil(totalRooms.length / new_per_page)

            return res.status(200).json({
                rooms,
                totalPage,
            });

        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getById(req, res, next) {
        try {
            const roomId = req.params.id;

            const room = await roomService.find({
                _id: roomId
            });

            if (room == '') return res.status(404).json('ID phòng này không tồn tại');

            return res.status(200).json(room);

        } catch (err) {
            return res.status(500).json('ID phòng không hợp lệ');
        }
    }

    async updateById(req, res, next) {
        try {
            const updateRoom = await roomService.update(req.params.id, req.body);

            if (updateRoom == '') return res.status(404).json('Không tìm thấy phòng này');

            return res.status(200).json('Cập nhật phòng thành công');
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async deleteById(req, res, next) {
        try {
            const deleteRoom = await roomService.delete(req.params.id);

            if (deleteRoom == '') return res.status(404).json('Không tìm thấy phòng này');

            return res.status(200).json('Xóa phòng thành công');
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = new RoomController;