import express from "express";

const router = express.Router();

// import child routes

import authRoutes from "./api-auth.js";
router.use("/auth", authRoutes);

import articleRoutes from "./api-articles.js";
router.use("/articles", articleRoutes);

import userRoutes from "./api-users.js";
router.use("/users", userRoutes);

import commentRoutes from "./api-comments.js";
router.use("/comments", commentRoutes);

import likesRoutes from "./api-likes.js";
router.use("/likes", likesRoutes);

import uploadRoutes from "./api-upload.js";
router.use("/upload", uploadRoutes);

import searchRoutes from "./api-search.js";
router.use("/search", searchRoutes);

export default router;