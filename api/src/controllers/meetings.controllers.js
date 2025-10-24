import { AppError } from "../utils/AppError.js";
import { meetingService } from "../services/metting.service.js";

export class MeetingController {
  static handleDatabaseError(dbError, defaultMessage) {
    if (dbError.code === 11000) throw new AppError(defaultMessage, 500);
    if (dbError.name === "MongoError")
      throw new AppError("Database error occurred", 500);
    throw dbError;
  }

  static async createMettingReq(req, res, next) {
    try {
      const metting = await meetingService.createMeeting(req.body);
      res.status(201).json({ message: "Appointment created 🎉", metting });
    } catch (err) {
      if (err.name === "MongoError" || err.code === 11000)
        return this.handleDatabaseError(err, "Database issue detected ⚙️");
      next(err);
    }
  }

  static async getAllRoles(req, res, next) {
    try {
      const roles = await meetingService.getRoles();
      res.status(200).json({ message: "Users fetched 🎉", roles });
    } catch (err) {
      if (err.name === "MongoError" || err.code === 11000) {
        this.handleDatabaseError(err, "Failed to fetch roles");
      }
      next(err);
    }
  }

  static async getAllMeetingsReq(req, res, next) {
    try {
      const allMettings = await meetingService.getAllMeetings();
      res
        .status(200)
        .json({ message: "All appointments fetched 🎉", allMettings });
    } catch (err) {
      if (err.name === "MongoError" || err.code === 11000) {
        this.handleDatabaseError(err, "Error fetching all meetings");
      }
      next(err);
    }
  }

  static async cancelMeetingReq(req, res, next) {
    try {
      const response = await meetingService.cancelMeetingReq(req.params.id);
      if (!response) throw new AppError("Error while deleting", 500);
      res.status(200).json({ message: "Request Deleted 🎉", success: true });
    } catch (err) {
      if (err.name === "MongoError" || err.code === 11000) {
        this.handleDatabaseError(err, "Error while canceling in DB");
      }
      next(err);
    }
  }

  static async approveMeetingReq(req, res, next) {
    try {
      const response = await meetingService.approveRejectMeetingReq(
        req.params.id,
        "approved",
      );
      if (!response) throw new AppError("Error while approving", 500);
      res.status(200).json({ message: "Request Approved 🎉", success: true });
    } catch (err) {
      if (err.name === "MongoError" || err.code === 11000) {
        this.handleDatabaseError(err, "Error while approving in DB");
      }
      next(err);
    }
  }

  static async rejectMeetingReq(req, res, next) {
    try {
      const response = await meetingService.approveRejectMeetingReq(
        req.params.id,
        "rejected",
      );
      if (!response) throw new AppError("Error while rejecting", 500);
      res.status(200).json({ message: "Request Rejected 🎉", success: true });
    } catch (err) {
      if (err.name === "MongoError" || err.code === 11000) {
        this.handleDatabaseError(err, "Error while rejecting in DB");
      }
      next(err);
    }
  }

  static async updatePriorityOfReq(req, res, next) {
    try {
      const response = await meetingService.updateAppointmentPriority(
        req.params.id,
        req.body.data,
      );
      if (!response) throw new AppError("Error while updating", 500);
      res.status(200).json({ message: "Priority Updated 🎉", success: true });
    } catch (err) {
      if (err.name === "MongoError" || err.code === 11000) {
        this.handleDatabaseError(err, "Error updating priority");
      }
      next(err);
    }
  }

  static async getReqsByRolesWithPagination(req, res, next) {
    try {
      const response = await meetingService.getReqsWithUserRole(req.params.id);
      if (!response) throw new AppError("Error while fetching data", 500);
      res.status(200).json({ success: true, mettings: response });
    } catch (err) {
      if (err.name === "MongoError" || err.code === 11000) {
        this.handleDatabaseError(err, "Error fetching data from DB");
      }
      next(err);
    }
  }
}
