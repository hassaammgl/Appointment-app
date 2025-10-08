import { authService } from "../services/auth.service.js";
import {
  AppError,
  ValidationError,
  AuthenticationError,
} from "../utils/AppError.js";
import { ENVS as CONSTANTS } from "../config/constants.js";
import { handleDbError } from "../utils/handleDbError.js";

export class AuthController {
  static async register(req, res, next) {
    try {
      const user = await authService.registerUser(req.body);
      res.status(201).json({ message: "User created 🎉", user });
    } catch (dbError) {
      handleDbError(dbError);
      next(dbError);
    }
  }

  static async login(req, res, next) {
    try {
      const user = await authService.loginUser(
        req.body.email,
        req.body.password
      );

      if (!user) {
        throw new AuthenticationError("Invalid email or password");
      }

      req.session.user = {
        id: user._id?.toString() || "",
        role: user.role,
        email: user.email,
        username: user.username,
        organization: user.organization,
      };

      res.json({ message: "Logged in 🛜", user: req.session.user });
    } catch (dbError) {
      handleDbError(dbError);
      next(dbError);
    }
  }

  static async logout(req, res) {
    req.session.destroy(() => {
      res.json({ message: "Logged out 👋" });
    });
  }

  async getOrganization(req, res, next) {
    try {
      if (!req.session.user) {
        throw new AuthenticationError("Not authenticated");
      }

      const org = await authService.getOrg({
        _id: req.session.user.organization,
      });

      if (!org) {
        throw new AppError("Organization not found", 404);
      }

      res.status(200).json({
        message: "Org data fetched 🎉",
        organization: org,
      });
    } catch (dbError) {
      handleDbError(dbError);
      next(dbError);
    }
  }

  async renewOrg(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new ValidationError("Developer Secret ID is required");
      }
      if (id !== CONSTANTS.DEVELOPER_SECRET) {
        throw new ValidationError("Invalid Developer Secret ID");
      }

      const org = await authService.renewOrganisation();

      if (!org) {
        throw new AppError("Organization not found", 404);
      }

      res.status(200).json({
        message: "Org data renewed 🎉",
        organization: org,
      });
    } catch (dbError) {
      handleDbError(dbError);
      next(dbError);
    }
  }

  static async savePlayer(req, res, next) {
    try {
      const { playerId, userId } = req.body;

      const player = await authService.savePlayerId(userId, playerId);
      if (!player) {
        throw new AppError("Error while saving player id", 404);
      }
      res.status(201).json({
        message: "Player id saved 🎉",
        user: player,
      });
    } catch (dbError) {
      handleDbError(dbError);
      next(dbError);
    }
  }
}

export const authController = new AuthController();
