const User = require("../users/users-model");

function logger(req, res, next) {
  console.log(
    `${new Date().toLocaleString()} ${req.method} to ${req.url} from ${req.get(
      "host"
    )}`
  );
  next();
}

async function validateUserId(req, res, next) {
  try {
    const validUserId = await User.getById(req.params.id);
    if (!validUserId) {
      res.status(404).json({
        message: "user not found",
      });
    } else {
      req.user = validUserId;
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: "problem finding user",
    });
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
