const expressJwt = require("express-jwt");
const util = require("util");

export { jwtMiddleware };

function jwtMiddleware(req, res) {
  const middleware = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: [
      // public routes that don't require authentication
      "/api/v1/approval",
      "/api/v1/request-otp",
      "/api/v1/verify-otp",
    ],
  });

  return util.promisify(middleware)(req, res);
}
