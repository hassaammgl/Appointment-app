export class ApiResponse {
  static success(res, options) {
    const {
      statusCode = 200,
      message = "",
      success = true,
      data = null,
    } = options;

    return res.status(statusCode).json({
      success,
      message,
      data,
    });
  }

  static error(res, options) {
    const { statusCode = 500, message = "Internal Server Error" } = options;

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}
