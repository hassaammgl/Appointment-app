import Users from "../models/user.model.js"
import Meeting from "../models/appointments.model.js"
import mongoose from "mongoose";

export const getRoles = async () => {
    // console.log("Getting roles");
    const roles = await Users.aggregate([
        {
            $match: {
                role: {
                    $in: ["ceo", "cto", "cfo", "gm"]
                }
            }
        }, {
            $project: {
                _id: 1,
                username: 1,
                email: 1,
                role: 1,
            }
        }
    ])
    return roles;
}

export const createMettings = async (data) => {
    let { visitorName, visitorNo, visitorCnic, purpose, notes, createdBy, to } = data
    to = to.split("-")[1]

    const meeting = await Meeting.create({
        visitorName,
        visitorNo,
        visitorCnic,
        purpose,
        notes,
        createdBy,
        to
    })

    const recipient = await Users.findById({ _id: to })
    return meeting
};

export const getAllMettings = async () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const allMeetings = await Meeting.find({ createdAt: { $gte: startOfToday } })
        .populate({ path: "to", select: "_id username role" })
        .populate({ path: "createdBy", select: "_id username role" })
        .sort({ createdAt: -1 });

    return allMeetings;
};

export const cancelMettingReq = async (_id) => {
    await Meeting.findOneAndDelete({ _id })
        .populate({ path: "to", select: "_id username role fcmTokens" })
        .populate({ path: "createdBy", select: "_id username role fcmTokens" })
    return true
}


export const approveRejectMettingReq = async (_id, type) => {
    await Meeting.findByIdAndUpdate({ _id }, {
        status: type
    })
    return true
}

export const updateAppointmentPriority = async (_id, value) => {
    await Meeting.findByIdAndUpdate({ _id }, {
        priority: value
    })
    return true
}


export const getReqsWithUserRole = async (userId) => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const allMeetings = await Meeting.find({
        to: new mongoose.Types.ObjectId(userId),
        createdAt: { $gte: startOfToday },
    })
        .populate({ path: "to", select: "_id username role" })
        .sort({ createdAt: -1 });
    return allMeetings;
};
