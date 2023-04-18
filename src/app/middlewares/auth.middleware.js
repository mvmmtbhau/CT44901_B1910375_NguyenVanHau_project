const jwt = require("jsonwebtoken");
const {User} = require("../models/");

// const isAuthentication = (req, res, next) => {
//   try {
//     console.log(req.headers['authorrization']);

//     const bearerHeader = req.headers["authorization"];
//     const access_token = bearerHeader.split(" ")[1];
    
//     // const decodeJwt = jwt.verify(
//     //   access_token,
//     //   process.env.SECRET_JWT
//     // );

//     // req.userId = decodeJwt._id; //gán id cho req sau
//     // next();
//   } catch (e) {
//     if (e instanceof jwt.TokenExpiredError) {
//       console.log("token het han");
//       return res.status(401).send("Token expired");
//     }

//     return res.status(401).send("Authentication not valid");
//   }
// };

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user?.role == "admin") {
      console.log("Là admin, mời vào!");
      next();
    } else {
      console.log("Không phải admin, đi chỗ khác chơi.");

      return res.status(403).send("Không phải tài khoản admin, xin dùng tài khoản khác.");
    }
  } catch (e) {
    console.log("loi check admin");
    return res.status(401).send("Authentication not valid");
  }
};

module.exports = {
  isAdmin: isAdmin,
};