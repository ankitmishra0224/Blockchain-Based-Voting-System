import { Request, Response } from "express";
import { User } from "../../entity/User";
import * as yup from "yup";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Validation schema
const schema = yup.object({
  body: yup.object({
    userId: yup.number().integer().required(),
  }),
});

// Function to send verification email
const sendVerificationEmail = async (user: User) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Missing email credentials in .env file");
    throw new Error("Missing email credentials");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Use Gmail SMTP
    port: 587, // TLS Port
    secure: false, // Use STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Blockchain Based Voting System" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Account Verified",
    text: `Hello ${user.name},\n\nYour account has been successfully verified by the admin. Now you can cast your Vote.\n\nBest regards,\nBlockchain Based Voting System`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to: ${user.email}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};

// Main verification handler
export default async (req: Request, res: Response) => {
  try {
    await schema.validate(req);
  } catch (error: any) {
    console.error("❌ Validation error:", error.errors);
    return res.status(400).json({ error: error.errors });
  }

  let user: User | null;
  try {
    user = await User.findOneOrFail({ where: { id: req.body.userId } });
  } catch (error) {
    console.error("❌ User not found:", error);
    return res.status(400).json({ error: "User not found" });
  }

  user.verified = true;
  await User.save(user);

  try {
    await sendVerificationEmail(user);
  } catch (emailError) {
    console.error("❌ Email error:", emailError);
    return res.status(500).json({ message: "User verified, but email could not be sent" });
  }

  return res.json({ user, message: "✅ User verified and email sent successfully." });
};
