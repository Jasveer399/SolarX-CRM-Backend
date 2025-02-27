import jwt from "jsonwebtoken";

const generateAccessToken = (id, email, adminType) => {
    return jwt.sign(
        {
          id: id,
          email: email,
          adminType: adminType
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );
}

export { generateAccessToken }