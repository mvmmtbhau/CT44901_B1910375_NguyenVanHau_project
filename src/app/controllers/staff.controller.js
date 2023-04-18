const staffService = require('../services/staff.service');
const positionService = require('../services/position.service');

class StaffController {
    async addNewStaff(req, res, next) {
        try {
            let staff;

            if (req.file) {
                staff = {
                    fullname: req.body.fullname,
                    gender: req.body.gender,
                    birthday: req.body.birthday,
                    phone: req.body.phone,
                    email: req.body.email,
                    address: req.body.address,
                    position: req.body.position,
                    avatar: req.file.filename,
                };
            } else {
                staff = {
                    fullname: req.body.fullname,
                    gender: req.body.gender,
                    birthday: req.body.birthday,
                    phone: req.body.phone,
                    email: req.body.email,
                    address: req.body.address,
                    position: req.body.position,
                };
            }

            const newStaff = await staffService.create(staff);

            if (newStaff) {
                const updatePosition = await positionService.updatePositionWithNewStaff(staff.position, newStaff._id);
                return res.status(201).json('Nhân viên mới thêm thành công');
            }

        } catch (err) {
            console.log(err);
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
                fullname: {
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
                    fullname: 'asc'
                }
            }

            if (req.query.sort_by == 3) {
                sortBy = {
                    fullname: 'desc'
                }
            }

            const staffs = await staffService.findLimit(
                req.query.search_text == '' ? {} : filter,
                new_per_page,
                skipNum,
                sortBy
            );

            const totalStaffs = await staffService.find(req.query.search_text == '' ? {} : filter);

            const totalPage = Math.ceil(totalStaffs.length / new_per_page)

            return res.status(200).json({
                staffs,
                totalPage,
            });

        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getById(req, res, next) {
        try {
            const staff = await staffService.find({
                _id: req.params.id
            })

            if (staff == '') return res.status(404).json('ID nhân viên không tồn tại');

            return res.status(200).json(staff);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async updateById(req, res, next) {
        try {
            let updateStaff;

            if (req.file) {
                updateStaff = await staffService.update(
                    req.params.id,
                    {
                        fullname: req.body.fullname,
                        gender: req.body.gender,
                        birthday: req.body.birthday,
                        email: req.body.email,
                        phone: req.body.phone,
                        address: req.body.address,
                        position: req.body.position,
                        avatar: req.file.filename,
                    }
                )
            } else {
                updateStaff = await staffService.update(
                    req.params.id,
                    {
                        fullname: req.body.fullname,
                        gender: req.body.gender,
                        birthday: req.body.birthday,
                        email: req.body.email,
                        phone: req.body.phone,
                        address: req.body.address,
                        position: req.body.position,
                    }
                )
            }

            if (updateStaff == '') return res.status(404).json('Nhân viên này không tồn tại');

            const removeStaffFromPosition = await positionService.updatePositionWithRemoveStaff(updateStaff.position._id, updateStaff._id);
            const updatePosition = await positionService.updatePositionWithNewStaff(req.body.position, updateStaff._id);

            return res.status(200).json('Cập nhật nhân viên thành công');

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async deleteById(req, res, next) {
        try {
            const removeStaff = await staffService.delete(req.params.id);

            if (removeStaff == '') return res.status(404).json('Nhân viên này không tồn tại');

            return res.status(200).json('Xóa nhân viên thành công');
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}

module.exports = new StaffController;