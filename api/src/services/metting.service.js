import Users from "../models/user.model"

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

export const createMettings = async ({ }) => {
};
