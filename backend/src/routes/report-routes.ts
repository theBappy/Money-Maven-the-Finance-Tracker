import { Router } from "express";
import {
  generateReportController,
  getAllReportController,
  updateReportSettingController,
} from "../controllers/report-controller";

const reportRoutes = Router();

reportRoutes.get("/all", getAllReportController);
reportRoutes.get("/generate", generateReportController);
reportRoutes.put("/update-setting", updateReportSettingController);

export default reportRoutes;
