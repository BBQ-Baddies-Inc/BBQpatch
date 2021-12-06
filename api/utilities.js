const requireUser = (req, res, next) => {
  if (!req.user) {
    res.status(401);
    next({ message: "You need to be logged in!" });
  } else {
    next();
  }
};

const isAdmin = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    if (!req.user || !req.user.admin) {
      return res
        .status(403)
        .json({ message: "You must have admin permissions" });
    }
    next();
  } else {
    const error = new Error("You must have admin permissions");
    next(error);
  }
};

module.exports = { requireUser, isAdmin };
