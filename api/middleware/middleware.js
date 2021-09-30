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
      next({ status: 404, message: "user not found" });
    } else {
      req.user = validUserId;
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  console.log("validate user", req.body);
  if (!name || !name.trim()) {
    next({ status: 400, message: "missing required name" });
  } else {
    req.name = name.trim();
    next();
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text || !text.trim()) {
    next({ status: 400, message: "missing required text field" });
  } else {
    req.text = text.trim();
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
