import userModel from "../models/user.js"
import bcrypt from "bcrypt"

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
        res.status(200).json({ message: "Submitted succesfully", success: true })
    }
    catch (err) {
        res.json({ message: err.message })
    }
}

jkbhj