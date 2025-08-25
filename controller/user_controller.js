import userModel from "../models/user.js"
import bcrypt from "bcrypt"
import { login } from "./login_controller.js";

export const signup = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt)
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name)) {
            return res.json({ message: "name must include letters only!!" })
        }
        const phnoRegex = /^[6-9]\d{9}$/;
        if (!phnoRegex.test(phone)) {
            return res.json({ message: "Please enter a valid 10-digit phone number." })
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.json({ message: "Please enter a valid email address" })
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*[^A-Za-z]).+$/;
        if (!passwordRegex.test(password)) {
            return res.json({ message: "Password must include both letters and numbers or special characters" });
        }
        if (password.length < 6) {
            return res.json({ message: "Password must be atleast 6 characters long" })
        }
        const user = new userModel({
            name, phone, email, password: hashedPassword, image: req.filename
        })
        await user.save()
        req.session.userid = user._id;
        res.status(200).json({ message: "Submitted succesfully", success: true, data: user, id: user._id })
    }
    catch (err) {
        res.json({ message: err.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const userdata = await userModel.findById(req.params.id, { password: 0, role: 0, status: 0, __v: 0 })
        if (!userdata) {
            return res.json({ message: "user not found" })
        }
        return res.json(userdata)
    }
    catch (err) {
        res.status(500).json({ message: "internal sever error" })
        console.log(err);
    }
}

export const editUser = async (req, res) => {
    try {
        const { name, phone, email, oldPassword, password } = req.body;

        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let passwordToUpdate = user.password;

        if (oldPassword && password) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Old password is incorrect" });
            }
            passwordToUpdate = await bcrypt.hash(password, 10);
        }

        const updateData = {
            name: name || user.name,
            email: email || user.email,
            phone: phone || user.phone,
            password: passwordToUpdate,
        };

        if (req.filename) {
            updateData.image = req.filename;
        }

        const data = await userModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        return res.status(200).json({
            message: "User updated successfully",
            data
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error occurred while updating" });
    }
};



export const logout = async (req, res) => {
    req.session.userid = null
    if (req.session.userid !== null) {
        return res.status(404).json({ message: "logout failed" })
    }
    else {
        return res.status(200).json({ message: "logout successfull", success: true })
    }
}


export const deleteUser = async (req, res) => {
    try {
        if (req.session.userid == req.params.id) {
            const data = await userModel.findByIdAndDelete(req.params.id)
            if (!data) {
                return res.status(404).json({ message: "user not found" })
            }
            else {
                req.session.destroy()
                return res.status(200).json({ message: "user deleted successfully" })
            }
        }
        else {
            return res.status(400).json("User cannot be deleted")
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server error" })
    }
}