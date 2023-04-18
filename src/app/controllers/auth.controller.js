const authService = require('../services/auth.service');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

class AuthController {
    async login(req, res, next) {
        try {
            const isExisted = await authService.find({
                username: req.body.username,
            });

            if (isExisted == '') return res.status(302).json({
                message: 'Tài khoản không đúng, xin nhập lại.'
            });

            const checkPassword = bcrypt.compareSync(req.body.password, isExisted[0].password);

            if (!checkPassword) return res.status(302).json({
                message: 'Mật khẩu không đúng, xin nhập lại'
            });

            const jwtToken = jwt.sign({...isExisted}, process.env.SECRET_JWT, {
                expiresIn: (3600 * 2),
            });

            return res.status(200).json({
                message: 'Đăng nhập thành công',
                accessToken: jwtToken
            });

        } catch (err) {
            console.log(err);
        }
    }

    async register(req, res, next) {
        try {
            const isExisted = await authService.find({
                username: req.body.username
            });

            if (isExisted != '') return res.status(302).send('Tài khoản đã tồn tại, xin đổi tên tài khoản khác');

            const newUser = await authService.register(req.body);

            return res.status(201).send(
                {
                    newUser,
                    message: 'Tạo tài khoản thành công'
                }
            )
        } catch (err) {
            console.log(err);
        }
    }

    async getUser(req, res, next) {
        try {
            const user = await authService.find({
                _id: req.params.id
            });

            return res.status(200).json(...user);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new AuthController;