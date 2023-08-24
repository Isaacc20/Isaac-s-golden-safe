const errorHandler = (error, req, res, next) => {
    if (error.name === "MongoError") {
      if (error.code === 1100) {
        return res
          .status(400)
          .send({
            message:
              "Duplicate key error. A value is already in use in our database",
            status: false,
          });
      }
    } else if (error.name === "Authentication error") {
      return res
        .status(401)
        .send({ message: "Authentication error", status: false });
    } else if (error.name === "Authorisation error") {
      return res
        .status(403)
        .send({ message: "Authorisation error", status: false });
    } else {
      return res
        .status(500)
        .send({ message: "Internal server error", status: false });
    }
  };
  
  module.exports = { errorHandler };
  