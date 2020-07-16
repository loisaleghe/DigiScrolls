const jwt = require("jsonwebtoken");

exports.authorize = async (req, res, next) => {
  try {
    //Provide token from the header
    const token = await req.header("x-auth");

    if (!token) {
      return res.status(401).send("unauthorized");
    }

    //to verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    //to add user to request object
    req.user = decoded.user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("An error has occured");
  }
};
