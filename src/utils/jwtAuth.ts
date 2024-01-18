import jwt, { Algorithm, JwtPayload } from 'jsonwebtoken';

export const createJWT = (payload: string) => {
   let token: string = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 5 * 86400,
      algorithm: process.env.JWT_SIGNING_ALGO as Algorithm
   })

   return token;
};

export const verifyJWT = (token: string) => {
   let decoded: JwtPayload | string;
   try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
   } catch (err) {
      return null;
   }
   return decoded;
};

