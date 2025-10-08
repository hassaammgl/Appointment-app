import session from "express-session";
import MongoStore from "connect-mongo";
import { ENVS } from "../config/constants.js";

export const sessionMiddleware = session({
  secret: ENVS.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: ENVS.MONGO_URI,
    collectionName: "sessions",
    ttl: 60 * 60 * 24 * 7,
  }),
  cookie: {
    httpOnly: true,
    secure: ENVS.NODE_ENV === "production",
    sameSite: ENVS.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});
