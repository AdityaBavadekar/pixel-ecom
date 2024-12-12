import User from "../models/User.js"

async function getMyUserProfile(req, res) {
    try {
        const { id } = req.userId;
        const user = await User.findById(id);
        if (!user){
            return res.status(404).json({message: "User with the provided id does not exist"});
        }
        delete user.password;
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error occurred"})
    }
}

async function updateUserById(req, res) {
    try {
        const { id } = req.params.id;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user){
            return res.status(404).json({message: "User with the provided id does not exist"});
        }
        delete user.password;
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error occurred"})
    }
}

export { getMyUserProfile, updateUserById };