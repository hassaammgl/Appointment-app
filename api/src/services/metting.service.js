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
        {
            $lookup: {
                from: 'users', // collection name, auto-pluralized to "users"
                localField: 'to',
                foreignField: '_id',
                as: 'toUser'
            }
        },
        {
            $unwind: {
                path: '$toUser',
                preserveNullAndEmptyArrays: true // in case some appointments don't have a `to` assigned yet
            }
        },
        {
            $project: {
                visitorName: 1,
                visitorNo: 1,
                visitorCnic: 1,
                purpose: 1,
                notes: 1,
                createdBy: 1,
                status: 1,
                priority: 1,
                priorityIndex: 1,
                createdAt: 1,
                updatedAt: 1,
                to: {
                    _id: '$toUser._id',
                    username: '$toUser.username'
                }
            }
        }
    ]);



    return allMettings
};

export const cancelMettingReq = async (_id) => {
    console.log(_id);
    const meeting = await Meeting.findOneAndDelete({ _id })
    console.log(meeting);
    return true
}