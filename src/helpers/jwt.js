import jwt from "jsonwebtoken";
import config from "@pages/api/config";

export const generateJwt = (userEmail, data = {}) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { userEmail, ...data },
      process.env.JWT_SECRET,
      config.JWT.SignOptions,
      function (err, token) {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const decodeJwt = (token) => {
  const decoded = jwt.decode(token);
  console.log("decoded", decoded);
  return decoded;
};

export const verifyJwt = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      config.JWT.VerifyOptions,
      function (err, decoded) {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      }
    );
  });
};

export const authorizer = (auth) => {
  return new Promise((resolve, reject) => {
    const token =
      auth && auth.split(" ")[0] === "Bearer" ? auth.split(" ")[1] : auth;
    verifyJwt(token)
      .then((decoded) => {
        var result = {
          principalId: decoded.userEmail,
          expDatetime: new Date(decoded.exp * 1000),
        };
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
