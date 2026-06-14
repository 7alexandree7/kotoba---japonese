import { User } from "../models/user.model.js";

export const testAdminRoute = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "access granted to admin route",
        data: req.user
    })
}


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching all users"
        })
    }
}


export const updateUserRole = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    if (!userId || !role) {
        return res.status(400).json({
            success: false,
            message: "User ID and role are required"
        })
    }

    try {
        const user = await User.findByIdAndUpdate(userId, { role }, { returnDocument: "after" });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating user role"
        })
    }
}


export const deleteAnyUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while deleting user"
        })
    }
}