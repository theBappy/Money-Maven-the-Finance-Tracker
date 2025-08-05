import { Request, Response } from "express";
import { asyncHandler } from "../middleware/async-handler-middleware";
import { HTTPSTATUS } from "../config/http-config";
import {
  generateReportSettingService,
  getAllReportService,
  updateReportSettingService,
} from "../services/report-service";
import { updateReportSettingSchema } from "../validators/report-validator";

export const getAllReportController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const pagination = {
      pageSize: parseInt(req.query.pageSize as string) || 20,
      pageNumber: parseInt(req.query.pageNumber as string) || 1,
    };

    const result = await getAllReportService(userId, pagination);

    return res.status(HTTPSTATUS.OK).json({
      message: "Reports history fetched successfully",
      ...result,
    });
  }
);

export const updateReportSettingController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const body = updateReportSettingSchema.parse(req.body);

    await updateReportSettingService(userId, body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Reports setting updated successfully",
    });
  }
);

export const generateReportController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Both 'from' and 'to' dates are required",
      });
    }

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Invalid date format. Please use ISO format.",
      });
    }

    const result = await generateReportSettingService(userId, fromDate, toDate);

    return res.status(HTTPSTATUS.OK).json({
      message: "Reports generated successfully",
      ...result
    });
  }
);

