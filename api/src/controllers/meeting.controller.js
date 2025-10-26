import { StatusCodes } from "http-status-codes";
import { meetingService } from "../services/metting.service.js";
import { handleDbError } from "../utils/handleDbError.js";
import { AppError } from "../utils/AppError.js";

class Meeting {
  async getAllRoles(_, res, next) {
    try {
      const roles = await meetingService.getRoles();
      res.status(StatusCodes.OK).json({
        message: "User fetched",
        roles,
      });
    } catch (error) {
      handleDbError(error);
      next(error);
    }
  }
  async createMettingReq(req, res, next) {
    try {
      const meeting = await meetingService.createMeeting(req.body);
      res.status(StatusCodes.CREATED).json({
        message: "Appointment created 🎉",
        meeting,
      });
    } catch (error) {
      handleDbError(error);
      next(error);
    }
  }
  async getAllMeetingsReq(_, res, next) {
    try {
      const allMeetings = await meetingService.getAllMeetings();
      res.status(StatusCodes.OK).json({
        message: "All appointments fetched 🎉",
        allMeetings,
      });
    } catch (error) {
      handleDbError(error);
      next(error);
    }
  }
  async cancelMeetingReq(req, res, next) {
    try {
      const response = await meetingService.cancelMeetingReq(req.params.id);
      if (!response) throw new AppError("Error while deleting", 500);
      res.status(StatusCodes.OK).json({
        message: "Request Deleted 🎉",
        success: true,
      });
    } catch (error) {
      handleDbError(error);
      next(error);
    }
  }
  async approveMeetingReq(req, res, next) {
    try {
      const response = await meetingService.approveRejectMeetingReq(
        req.params.id,
        "approved"
      );

      if (!response) throw new AppError("Error while approving", 500);
      res.status(StatusCodes.OK).json({
        message: "Request Approved 🎉",
        success: true,
      });
    } catch (error) {
      handleDbError(error);
      next(error);
    }
  }
  async rejectMeetingReq(req, res, next) {
    try {
      const response = await meetingService.approveRejectMeetingReq(
        req.params.id,
        "rejected"
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
  async updatePriorityOfReq(req, res, next) {
    try {
      const response = await meetingService.updateAppointmentPriority(
        req.params.id,
        req.body.data
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
  async getReqsByRoles(req, res, next) {
    try {
      const response = await meetingService.getReqsWithUserRole(req.params.id);
      if (!response) throw new AppError("Error while fetching data", 500);
      res.status(200).json({ success: true, mettings: response });
    } catch (err) {
      handleDbError(err);
      next(err);
    }
  }
}

export const meeting = new Meeting();
