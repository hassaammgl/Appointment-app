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

  async createMeeting(data) {
    let { visitorName, visitorNo, visitorCnic, purpose, notes, createdBy, to } =
      data;

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
    return meeting;
  }

  async getAllMeetings() {
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

  async cancelMeetingReq(_id) {
    const met = await Meeting.findOneAndDelete({ _id })
      .populate({ path: "to", select: "_id username role" })
      .populate({
        path: "createdBy",
        select: "_id username role fcmTokens",
      });

    return true;
  }

  async approveRejectMeetingReq(_id, type) {
    const validStatus = ["approved", "rejected"];
    if (!validStatus.includes(type))
      throw new Error(
        `Invalid status type: ${type}. Must be one of ${validStatus.join(", ")}`,
      );

    await Meeting.findByIdAndUpdate(_id, { status: type });
    return true;
  }

  async updateAppointmentPriority(_id, value) {
    const VALID_PRIORITIES = Object.freeze(["low", "medium", "high", "urgent"]);

    if (!_id || !value) {
      throw new Error("Meeting ID and priority value are required");
    }

    const priority = value.toLowerCase().trim();
    if (!VALID_PRIORITIES.includes(priority)) {
      throw new Error(
        `Invalid priority: "${value}". Must be one of: ${VALID_PRIORITIES.join(", ")}`,
      );
    }

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      _id,
      { priority, updatedAt: new Date() },
      { new: true, runValidators: true, select: "priority status title" },
    );

    if (!updatedMeeting) {
      throw new Error(`Meeting not found with ID: ${_id}`);
    }

    return updatedMeeting;
  }

  async getReqsWithUserRole(userId) {
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

export const meetingService = new MeetingService();
