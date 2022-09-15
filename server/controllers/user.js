import express from "express";
import mongoose from "mongoose";
import UserInfo from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserInfo.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "No existing user signin" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(409).json({ message: "Invalid password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "text",
      { expiresIn: "10h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await UserInfo.findOne({ email }); //checking existing email
    if (existingUser)
      return res.status(400).json({ message: "user already exist" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "password not match" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserInfo.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "10h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
