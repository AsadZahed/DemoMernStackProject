import { RequestHandler } from "express";
import createHttpError from "http-errors";

//middleware function to authenticate user else return 401 unauthorised
export const requiresAuth: RequestHandler = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        next(createHttpError(401, "User not authenticated"));
    }
};