import { APIError } from "@/generic/APIError";
import jwt from "jsonwebtoken";

export const checkToken = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw new APIError(401, `No authorization token found.`);

  try {
    req.user = jwt.verify(token.split(" ")[1], process.env.JWT_TOKEN);
  } catch (err) {
    throw new APIError(498, `Invalid authorization token.`);
  }

  return next();
};
