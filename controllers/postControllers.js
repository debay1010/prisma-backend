const prisma = require("../prisma/index");

// Create a new post
exports.createPost = async (req, res, next) => {
	try {
		const { slug, title, body, authorId } = req.body;

		// do validation urself
		if (!slug || !title || !body || !authorId) {
			throw new Error("pls provide all fields");
		}

		const result = await prisma.post.create({
			data: {
				slug,
				title,
				body,
				author: { connect: { id: authorId } },
			},
		});
		res.json(result);
	} catch (error) {
		throw new Error(error);
	}
};

exports.updatePost = async (req, res, next) => {
	const { id } = req.params; // from url
	const { title, body } = req.body;

	try {
		const result = await prisma.post.update({
			where: {
				id: id,
			},
			data: {
				title: title,
				body: body,
			},
		});
		res.json(result);
	} catch (error) {
		res.json({ error: `Post with ${id} does not exist` });
	}
};

// delete post

exports.deletePost = async (req, res, next) => {
	const { id } = req.params;

	try {
		const result = await prisma.post.delete({
			where: {
				id: id,
			},
		});
		res.json(result);
	} catch (error) {
		res.json({ error: `The post with ${id} does not exist` });
	}
};

exports.getPosts = async (req, res, next) => {
	try {
		const result = await prisma.post.findMany();
		res.json(result);
	} catch (error) {
		res.json({ error: `"No post was found` });
	}
};
