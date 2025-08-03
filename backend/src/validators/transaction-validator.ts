import { z } from "zod";
import {
  PaymentMethodEnum,
  RecurringIntervalEnum,
  TransactionTypeEnum,
} from "../models/transaction-model";

export const baseTransactionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum([TransactionTypeEnum.INCOME, TransactionTypeEnum.EXPENSE], {
    errorMap: () => ({
      message: "Transaction type must be either INCOME or EXPENSE",
    }),
  }),
  amount: z.number().positive("Amount must be positive").min(1),
  category: z.string().min(1, "Category is required"),
  date: z
    .union([z.string().datetime({ message: "Invalid date string" }), z.date()])
    .transform((val) => new Date(val)),
  isRecurring: z.boolean().default(false),
  recurringInterval: z
    .enum([
      RecurringIntervalEnum.DAILY,
      RecurringIntervalEnum.WEEKLY,
      RecurringIntervalEnum.MONTHLY,
      RecurringIntervalEnum.YEARLY,
    ])
    .nullable()
    .optional(),
  receiptUrl: z.string().optional(),
  paymentMethod: z
    .enum([
      PaymentMethodEnum.CARD,
      PaymentMethodEnum.CASH,
      PaymentMethodEnum.BANK_TRANSFER,
      PaymentMethodEnum.MOBILE_PAYMENT,
      PaymentMethodEnum.AUTO_DEBIT,
      PaymentMethodEnum.OTHER,
    ])
    .default(PaymentMethodEnum.CASH),
});

export const createTransactionSchema = baseTransactionSchema;
export const updateTransactionSchema = baseTransactionSchema.partial();

export type CreateTransactionType = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionType = z.infer<typeof updateTransactionSchema>;
