function customMiddleware(customParameter) {
  return (req, res, next) => {
    console.log(
      "this is a custom middleware Just for testing and will run on every request"
    );
    next();
  };
}

module.exports = { customMiddleware };
