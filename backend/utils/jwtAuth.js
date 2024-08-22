import jwt from "jsonwebtoken";

export const signToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY);
  };
  

