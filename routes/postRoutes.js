const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");
const {
	createPost,
	updatePost,
	deletePost,
	getPosts,
} = require("../controllers/postControllers");

router.route("/post/create").post(isLoggedIn, createPost);
router.route("/post/update").put(isLoggedIn, updatePost);
router.route("/post/delete").delete(isLoggedIn, deletePost);
router.route("/posts/get").get(getPosts);

module.exports = router;
