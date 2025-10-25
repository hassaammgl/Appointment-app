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

    // [TODO]: fetch user with to and for notifications
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

  async cancelMeetingReq(_id) {}

  async approveRejectMeetingReq(_id, type) {}

  async updateAppointmentPriority(_id, value) {}

  async getReqsWithUserRole(userId) {}
}

export const meetingService = new MeetingService();
