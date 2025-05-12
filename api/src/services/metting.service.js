import Users from "../models/user.model"
import Meeting from "../models/appointments.model"

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
    const allMettings = await Meeting.aggregate([
        { $sort: { createdAt: -1 } },
    ]);
    return allMettings
};

export const cancelMettingReq = async (_id) => {
    console.log(_id);
    const meeting = await Meeting.findOneAndDelete({ _id })
    console.log(meeting);
    return true
}