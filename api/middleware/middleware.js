const User = require("../users/users-model");

function logger(req, res, next) {
  console.log(
    `${new Date().toISOString()} ${req.method} to ${req.url} from ${req.get(
      "host"
    )}`
  );
  next();
}

async function validateUserId(req, res, next) {
  try {
    const validUserId = await User.getById(req.params.id);
    if (validUserId) {
      req.user = validUserId;
      next();
    } else {
      next({ status: 404, message: "user not found" });
    }
  } catch (error) {
    next(error);
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
};
