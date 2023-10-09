import express from "express";
import * as dotenv from "dotenv";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json([...posts]);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});

router.route("/:id").get(async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id);
    res
      .status(200)
      .json({
        _id: id,
        first_name: post.first_name,
        last_name: post.last_name,
        email: post.email,
        avatar: post.avatar,
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { first_name, last_name, email, avatar } = req.body;
    const newPost = await Post.create({
      first_name,
      last_name,
      email,
      avatar,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
});

router.route("/:id").deleteById(async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Post.deleteOne({ id: id });

    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to delete a post, please try again",
    });
  }
});

export default router;
