import { AppError } from "../utils/AppError.js";
import { meetingService } from "../services/metting.service.js";

export class MeetingController {
  handleDatabaseError(dbError, defaultMessage) {
    const error = dbError;

    if (error.code === 11000) {
      throw new AppError(defaultMessage, 500);
    } else if (error.name === "MongoError") {
      throw new AppError("Database error occurred", 500);
    }
    throw dbError;
  }

  async createMettingReq(req, res, next) {
    try {
      try {
        console.log(req.body);

        const metting = await meetingService.createMeeting(req.body);
        res.status(201).json({
          message: "Appointment created 🎉",
          metting,
        });
      } catch (dbError) {
        this.handleDatabaseError(
          dbError,
          "Something happened in database but try to change their values"
        );
      }
    } catch (err) {
      next(err);
    }
  }

  async getAllRoles(req, res, next) {
    try {
      try {
        const roles = await meetingService.getRoles();
        res.status(200).json({
          message: "Users getting successfully 🎉",
          roles,
        });
      } catch (dbError) {
        this.handleDatabaseError(dbError, "Something happened in database");
      }
    } catch (err) {
      next(err);
    }
  }

  async getAllMeetingsReq(req, res, next) {
    try {
      try {
        const allMettings = await meetingService.getAllMeetings();
        res.status(200).json({
          message: "All appointments fetched 🎉",
          allMettings,
        });
      } catch (dbError) {
        this.handleDatabaseError(
          dbError,
          "Something happened in database but try to change their values"
        );
      }
    } catch (err) {
      next(err);
    }
  }

  async cancelMeetingReq(req, res, next) {
    try {
      try {
        const response = await meetingService.cancelMeetingReq(req.params.id);
        if (response) {
          res.status(200).json({
            message: "Request Deleted 🎉",
            success: true,
          });
        } else {
          throw new AppError("Error while deleting", 500);
        }
      } catch (dbError) {
        this.handleDatabaseError(
          dbError,
          "Something happened while canceling in db"
        );
      }
    } catch (err) {
      next(err);
    }
  }

  async approveMeetingReq(req, res, next) {
    try {
      try {
        const response = await meetingService.approveRejectMeetingReq(
          req.params.id,
          "approved"
        );
        if (response) {
          res.status(200).json({
            message: "Request Approved 🎉",
            success: true,
          });
        } else {
          throw new AppError("Error while Approving", 500);
        }
      } catch (dbError) {
        this.handleDatabaseError(
          dbError,
          "Something happened while approving in db"
        );
      }
    } catch (err) {
      next(err);
    }
  }

  async rejectMeetingReq(req, res, next) {
    try {
      try {
        const response = await meetingService.approveRejectMeetingReq(
          req.params.id,
          "rejected"
        );
        if (response) {
          res.status(200).json({
            message: "Request Rejected 🎉",
            success: true,
          });
        } else {
          throw new AppError("Error while Rejecting", 500);
        }
      } catch (dbError) {
        this.handleDatabaseError(
          dbError,
          "Something happened while rejecting in db"
        );
      }
    } catch (err) {
      next(err);
    }
  }

  async updatePriorityOfReq(req, res, next) {
    try {
      console.log(req.params.id, req.body.data);

      try {
        const response = await meetingService.updateAppointmentPriority(
          req.params.id,
          req.body.data
        );
        if (response) {
          res.status(200).json({
            message: "Priority Updated 🎉",
            success: true,
          });
        } else {
          throw new AppError("Error while Updating", 500);
        }
      } catch (dbError) {
        this.handleDatabaseError(
          dbError,
          "Something happened while updating in db"
        );
      }
    } catch (err) {
      next(err);
    }
  }

  async getReqsByRolesWithPagination(req, res, next) {
    try {
      try {
        const response = await meetingService.getReqsWithUserRole(
          req.params.id
        );
        if (response) {
          res.status(200).json({
            success: true,
            mettings: response,
          });
        } else {
          throw new AppError("Error while fetching data", 500);
        }
      } catch (dbError) {
        this.handleDatabaseError(
          dbError,
          "Something happened while fetching data from db"
        );
      }
    } catch (err) {
      next(err);
    }
  }
}

export const meetingController = new MeetingController();
