function createValidator(schema, requestProperty, fieldName) {
  return (req, res, next) => {
    const { error } = schema.validate(req[requestProperty][fieldName]);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    } else {
      next();
    }
  };
}

module.exports = createValidator;
