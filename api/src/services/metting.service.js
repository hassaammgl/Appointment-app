import Users from "../models/user.model"
import Meeting from "../models/appointments.model"
import mongoose from "mongoose";

export const getRoles = async () => {
    console.log("Getting roles");
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
    console.log(roles);
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

    console.log("Created " + meeting);
    return meeting
};

export const getAllMettings = async () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0); // sets to 00:00:00 today

    const allMeetings = await Meeting.find({ createdAt: { $gte: startOfToday } })
        .populate({ path: "to", select: "_id username role" })
        .populate({ path: "createdBy", select: "_id username role" })
        .sort({ createdAt: -1 });

    return allMeetings;
};

export const cancelMettingReq = async (_id) => {
    console.log(_id);
    const meeting = await Meeting.findOneAndDelete({ _id })
    console.log(meeting);
    return true
}


export const approveRejectMettingReq = async (_id, type) => {
    console.log(_id, "type " + type);
    const req = await Meeting.findByIdAndUpdate({ _id }, {
        status: type
    })
    console.log(req);
    return true
}

export const updateAppointmentPriority = async (_id, value) => {
    console.log(_id, "Value " + value);
    const req = await Meeting.findByIdAndUpdate({ _id }, {
        priority: value
    })
    console.log(req);
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

    console.log(allMeetings);

    return allMeetings;
};

