import { Types } from "mongoose";
import Users from "../models/user.model.js";
import Meeting from "../models/appointments.model.js";

class MeetingService {
  async getRoles() {
     const roles = await Users.aggregate([
			{
				$match: {
					role: {
						$in: ["ceo", "cto", "cfo", "gm"],
					},
				},
			},
			{
				$project: {
					_id: 1,
					username: 1,
					email: 1,
					role: 1,
				},
			},
		]);
		return roles;
  }

	async createMeeting(data) {}

	async getAllMeetings() {}

	async cancelMeetingReq(_id) {}

	async approveRejectMeetingReq(_id, type) {}

	async updateAppointmentPriority(_id, value) {}

	async getReqsWithUserRole(userId) {}
}

export const meetingService = new MeetingService();
