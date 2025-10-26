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
  async approveMeetingReq(req, res, next) {}
  async rejectMeetingReq(req, res, next) {}
  async updatePriorityOfReq(req, res, next) {}
  async getReqsByRoles(req, res, next) {
	 try {
      const response = await meetingService.getReqsWithUserRole(req.params.id)
      if (!response) throw new AppError("Error while fetching data", 500);
      res.status(200).json({ success: true, mettings: response });
    } catch (err) {
		handleDbError(err);
      next(err);
    }
  }
}

export const meeting = new Meeting();
