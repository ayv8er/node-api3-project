const express = require("express");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const Users = require("./users-model");
const Posts = require("../posts/posts-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post("/", validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  Users.update(req.params.id, req.body)
    .then((user) => {
      res.status(202).json(req.body);
    })
    .catch(next);
});

router.delete("/:id", validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const deletedUser = req.body;
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json(deletedUser);
    })
    .catch(next);
});

router.get("/:id/posts", validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const result = await Users.getUserPosts(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/posts", validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const newPost = { ...req.body, user_id: req.params.id };
  Posts.insert({ newPost })
    .then((postInfo) => {
      res.status(201).json(postInfo);
    })
    .catch(next);
});

// do not forget to export the router
module.exports = router;
