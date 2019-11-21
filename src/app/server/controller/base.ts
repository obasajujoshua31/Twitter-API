import { Response } from "express";

abstract class BaseController {
  public sendSuccessResponse(res: Response, data: object) {
    return res.status(200).json({
      success: true,
      data,
    });
  }

  public sendErrorResponse(res: Response, code: number, message: string) {
    return res.status(code).json({
      success: false,
      message,
    });
  }
}

export default BaseController;
