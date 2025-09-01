import mongoose, { Types } from "mongoose";
import type { IUser } from "../models/user.model";
import Users from "../models/user.model";
import type { IAppointment } from "../models/appointments.model";
import Meeting from "../models/appointments.model";
import {NotificationService} from "../utils/NotificationSystem"


interface CreateMeetingDTO {
  visitorName: string;
  visitorNo?: string;
  visitorCnic?: string;
  purpose?: string;
  notes?: string;
  createdBy: string;
  to: string;
}

class MeetingService {
	async getRoles(): Promise<IUser[]> {
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

	async createMeeting(data: CreateMeetingDTO): Promise<IAppointment> {
		let {
			visitorName,
			visitorNo,
			visitorCnic,
			purpose,
			notes,
			createdBy,
			to,
		} = data;

		to = to.split("-")[1];

		const meeting = await Meeting.create({
			visitorName,
			visitorNo,
			visitorCnic,
			purpose,
			notes,
			createdBy,
			to,
		});

		const user = await Users.findById(to);

		await NotificationService.notifyUser(
			user?._id || "",
			"New Meeting Request",
			`You have a new meeting request from ${visitorName}.`,
		);

		return meeting;
	}

	async getAllMeetings(): Promise<IAppointment[]> {
		const startOfToday = new Date();
		startOfToday.setHours(0, 0, 0, 0);

		const allMeetings = await Meeting.find({
			createdAt: { $gte: startOfToday },
		})
			.populate({ path: "to", select: "_id username role" })
			.populate({ path: "createdBy", select: "_id username role" })
			.sort({ createdAt: -1 });

		return allMeetings;
	}

	async cancelMeetingReq(_id: string): Promise<boolean> {
	const met =	await Meeting.findOneAndDelete({ _id })
			.populate({ path: "to", select: "_id username role fcmTokens" })
			.populate({
				path: "createdBy",
				select: "_id username role fcmTokens",
			});
			

		return true;
	}

	async approveRejectMeetingReq(
		_id: string,
		type: "approved" | "rejected"
	): Promise<boolean> {
		await Meeting.findByIdAndUpdate(_id, { status: type });
		return true;
	}

	async updateAppointmentPriority(
		_id: string,
		value: number
	): Promise<boolean> {
		await Meeting.findByIdAndUpdate(_id, { priority: value });
		return true;
	}

	async getReqsWithUserRole(userId: string): Promise<IAppointment[]> {
		const startOfToday = new Date();
		startOfToday.setHours(0, 0, 0, 0);

		const allMeetings = await Meeting.find({
			to: new Types.ObjectId(userId),
			createdAt: { $gte: startOfToday },
		})
			.populate({ path: "to", select: "_id username role" })
			.sort({ createdAt: -1 });

		return allMeetings;
	}
}

export const meetingService = new MeetingService()