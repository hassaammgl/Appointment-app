import { StatusCodes } from "http-status-codes";
import { meetingService } from "../services/metting.service.js";
import { handleDbError } from "../utils/handleDbError.js";

class Meeting {
	async getAllRoles(req, res, next) {
		try {
			const roles = await meetingService.getRoles();
			res.status(StatusCodes.OK).json({
				message: "User fetched",
				roles,
			});
		} catch (error) {
			handleDbError(error);
		}
	}
	async createMettingReq(req, res, next) {}
	async getAllMeetingsReq(req, res, next) {}
	async cancelMeetingReq(req, res, next) {}
	async approveMeetingReq(req, res, next) {}
	async rejectMeetingReq(req, res, next) {}
	async updatePriorityOfReq(req, res, next) {}
	async getReqsByRolesWithPagination(req, res, next) {}
}

export const meeting = new Meeting();
