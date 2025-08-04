import { Router } from "express";
import {
  getAllReportController,
  updateReportSettingController,
} from "../controllers/report-controller";

const reportRoutes = Router();

reportRoutes.get("/all", getAllReportController);
reportRoutes.put("/update-setting", updateReportSettingController);

export default reportRoutes;
