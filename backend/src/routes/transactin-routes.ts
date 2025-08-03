import { Router } from "express";
import {
  bulkDeleteTransactionController,
  createTransactionController,
  deleteTransactionController,
  duplicateTransactionController,
  getAllTransactionController,
  getTransactionByIdController,
  //   updateTransactionController,
} from "../controllers/transaction-controller";

const transactionRoutes = Router();

transactionRoutes.post("/create", createTransactionController);

transactionRoutes.put("/duplicate/:id", duplicateTransactionController);
// transactionRoutes.put("/update/:id", updateTransactionController);
transactionRoutes.delete("/delete/:id", deleteTransactionController);
transactionRoutes.delete("/bulk-delete", bulkDeleteTransactionController);

transactionRoutes.get("/all", getAllTransactionController);
transactionRoutes.get("/:id", getTransactionByIdController);

export default transactionRoutes;
