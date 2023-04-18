const positionService = require('../services/position.service');
const staffService = require('../services/staff.service');

class positionController {
    async addNewPosition(req, res, next) {
        try {
            const position = {
                name: req.body.name,
                salary: req.body.salary,
                overtime_salary: req.body.overtime_salary
            };

            const isExisted = await positionService.find({
                name: position.name,
            });

            if (isExisted[0]) return res.status(303).json('Vị trí này đã tồn tại');

            const newPosition = await positionService.create(position);

            return res.status(201).json('Vị trí mới thêm thành công');
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
                name: {
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
                    name: 'asc'
                }
            }

            if (req.query.sort_by == 3) {
                sortBy = {
                    name: 'desc'
                }
            }

            const positions = await positionService.findLimit(
                req.query.search_text == '' ? {} : filter,
                new_per_page,
                skipNum,
                sortBy);

            const totalPositions = await positionService.find(req.query.search_text == '' ? {} : filter);

            const totalPage = Math.ceil(totalPositions.length / new_per_page)

            return res.status(200).json({
                positions,
                totalPage,
            });

        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getPositions(req, res, next) {
        try {
            return res.status(200).json(await positionService.find({}));
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getById(req, res, next) {
        try {
            const position = await positionService.find({
                _id: req.params.id
            })

            if (position == '') return res.status(404).json('Vị trí công việc không tồn tại');

            return res.status(200).json(position);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async updateById(req, res, next) {
        try {
            const updatePosition = await positionService.update(
                req.params.id, req.body
            )

            if (updatePosition == null) return res.status(404).json('Không tìm thấy vị trí công việc này');

            return res.status(200).json('Cập nhật thành công');
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async deleteById(req, res, next) {
        try {
            const isExisted = await positionService.delete(req.params.id);

            if (isExisted == null) return res.status(404).json('Vị trí công việc không tồn tại');

            return res.status(200).json('Xóa thành công');
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}

module.exports = new positionController;