import Users from "../models/user.model.js";
import Appointment from "../models/appointments.model.js";
import { logger } from "../utils/logger.js";
import mongoose from "mongoose";

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

    const meeting = await Appointment.create({
      visitorName,
      visitorNo,
      visitorCnic,
      purpose,
      notes,
      createdBy,
      to,
    });

    // [TODO]: fetch user with to and for notifications
    return meeting;
  }

  async getAllMeetings() {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const allMeetings = await Appointment.find({
      createdAt: { $gte: startOfToday },
    })
      .populate({ path: "to", select: "_id username role" })
      .populate({ path: "createdBy", select: "_id username role" })
      .sort({ createdAt: -1 });

    logger.debug(`[MEETINGS] ${allMeetings.length} meetings found today`);
    return allMeetings;
  }

  async cancelMeetingReq(_id) {
    await Appointment.findByIdAndDelete({ _id })
      .populate({ path: "to", select: "_id username role" })
      .populate({
        path: "createdBy",
        select: "_id username role",
      });

    return true;
  }

  async approveRejectMeetingReq(_id, type) {
    const validStatus = ["approved", "rejected"];
    logger.debug(type);
    if (!validStatus.includes(type))
      throw new Error(
        `Invalid status type: ${type}. Must be one of ${validStatus.join(", ")}`
      );

    await Appointment.findByIdAndUpdate(_id, { status: type });
    return true;
  }

  async updateAppointmentPriority(_id, value) {
    const updatedMeeting = await Appointment.findByIdAndUpdate(
      _id,
      { priority: value, updatedAt: new Date() },
      { new: true, runValidators: true, select: "priority status title" }
    );

    if (!updatedMeeting) {
      throw new Error(`Meeting not found with ID: ${_id}`);
    }

    return updatedMeeting;
  }

  async getReqsWithUserRole(userId) {
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Valid userId is required");
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const allMeetings = await Appointment.find({
      to: new mongoose.Types.ObjectId(userId),
      createdAt: { $gte: startOfToday },
    })
      .populate("to", "_id username role")
      .sort({ createdAt: -1 })
      .lean();

    return allMeetings;
  }
}

export const meetingService = new MeetingService();
