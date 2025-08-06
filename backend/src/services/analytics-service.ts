import mongoose from "mongoose";
import { DateRangePreset } from "../@types/analytics-type";
import TransactionModel, {
  TransactionTypeEnum,
} from "../models/transaction-model";
import { getDateRange } from "../utils/date";
import { DateRangeEnum } from "../enums/date-range-enum";
import { differenceInDays, subDays, subYears } from "date-fns";
import { convertToDollarUnit } from "../utils/format-currency";

export const summaryAnalyticsService = async (
  userId: string,
  dateRangePreset?: DateRangePreset,
  customFrom?: Date,
  customTo?: Date
) => {
  const range = getDateRange(dateRangePreset, customFrom, customTo);

  let { from, to, value: rangeValue } = range;

  // --- DEBUG: Log types and values of from/to/rangeValue
  console.log("Range from:", from, "type:", typeof from, from instanceof Date);
  console.log("Range to:", to, "type:", typeof to, to instanceof Date);
  console.log("Range value:", rangeValue);

  // Ensure from and to are Date objects for date-fns usage
  if (typeof from === "string") {
    from = new Date(from);
    console.log("Converted from string to Date:", from);
  }
  if (typeof to === "string") {
    to = new Date(to);
    console.log("Converted to string to Date:", to);
  }

  // --- Build aggregation pipeline for current period
  const currentPeriodPipeline: any[] = [
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        ...(from &&
          to && {
            date: {
              $gte: from,
              $lte: to,
            },
          }),
      },
    },
    {
      $group: {
        _id: null,
        totalIncome: {
          $sum: {
            $cond: [
              { $eq: ["$type", TransactionTypeEnum.INCOME] },
              { $abs: "$amount" },
              0,
            ],
          },
        },
        totalExpenses: {
          $sum: {
            $cond: [
              { $eq: ["$type", TransactionTypeEnum.EXPENSE] },
              { $abs: "$amount" },
              0,
            ],
          },
        },
        transactionCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        totalIncome: 1,
        totalExpenses: 1,
        transactionCount: 1,
        availableBalance: { $subtract: ["$totalIncome", "$totalExpenses"] },
        savingData: {
          $let: {
            vars: {
              income: { $ifNull: ["$totalIncome", 0] },
              expenses: { $ifNull: ["$totalExpenses", 0] },
            },
            in: {
              savingPercentage: {
                $cond: [
                  { $lte: ["$$income", 0] },
                  0,
                  {
                    $multiply: [
                      {
                        $divide: [
                          { $subtract: ["$$income", "$$expenses"] },
                          "$$income",
                        ],
                      },
                      100,
                    ],
                  },
                ],
              },
              expenseRatio: {
                $cond: [
                  { $lte: ["$$income", 0] },
                  0,
                  {
                    $multiply: [{ $divide: ["$$expenses", "$$income"] }, 100],
                  },
                ],
              },
            },
          },
        },
      },
    },
  ];

  // Run aggregation for current period
  const [current] = await TransactionModel.aggregate(currentPeriodPipeline);
  console.log("Current period aggregation result:", current);

  const {
    totalIncome = 0,
    totalExpenses = 0,
    availableBalance = 0,
    transactionCount = 0,
    savingData = {
      expenseRatio: 0,
      savingPercentage: 0,
    },
  } = current || {};

  let percentageChange: any = {
    income: 0,
    expenses: 0,
    balance: 0,
    prevPeriodFrom: null,
    prevPeriodTo: null,
    previousValues: {
      incomeAmount: 0,
      expenseAmount: 0,
      balanceAmount: 0,
    },
  };

  // Calculate previous period if applicable
  if (from && to && rangeValue !== DateRangeEnum.ALL_TIME) {
    const period = differenceInDays(to, from) + 1;
    console.log("Period days:", period);

    const isYearly = [
      DateRangeEnum.LAST_YEAR,
      DateRangeEnum.THIS_YEAR,
    ].includes(rangeValue);

    let prevPeriodFrom: Date, prevPeriodTo: Date;
    if (isYearly) {
      prevPeriodFrom = subYears(from, 1);
      prevPeriodTo = subYears(to, 1);
    } else {
      prevPeriodFrom = subDays(from, period);
      prevPeriodTo = subDays(to, period);
    }
    console.log("Previous period from:", prevPeriodFrom);
    console.log("Previous period to:", prevPeriodTo);

    const prevPeriodPipeline = [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: prevPeriodFrom,
            $lte: prevPeriodTo,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: [
                { $eq: ["$type", TransactionTypeEnum.INCOME] },
                { $abs: "$amount" },
                0,
              ],
            },
          },
          totalExpenses: {
            $sum: {
              $cond: [
                { $eq: ["$type", TransactionTypeEnum.EXPENSE] },
                { $abs: "$amount" },
                0,
              ],
            },
          },
        },
      },
    ];

    // Run aggregation for previous period
    const [previous] = await TransactionModel.aggregate(prevPeriodPipeline);
    console.log("Previous period aggregation result:", previous);

    if (previous) {
      const prevIncome = previous.totalIncome || 0;
      const prevExpenses = previous.totalExpenses || 0;
      const prevBalance = prevIncome - prevExpenses;

      const currentIncome = totalIncome;
      const currentExpenses = totalExpenses;
      const currentBalance = availableBalance;

      percentageChange = {
        income: calculatePercentageChange(prevIncome, currentIncome),
        expenses: calculatePercentageChange(prevExpenses, currentExpenses),
        balance: calculatePercentageChange(prevBalance, currentBalance),
        prevPeriodFrom: prevPeriodFrom,
        prevPeriodTo: prevPeriodTo,
        previousValues: {
          incomeAmount: prevIncome,
          expenseAmount: prevExpenses,
          balanceAmount: prevBalance,
        },
      };
    }
  }

  // Final result, converting amounts from cents to dollars
  return {
    availableBalance: convertToDollarUnit(availableBalance),
    totalIncome: convertToDollarUnit(totalIncome),
    totalExpenses: convertToDollarUnit(totalExpenses),
    savingRate: {
      percentage: parseFloat(savingData.savingPercentage.toFixed(2)),
      expenseRatio: parseFloat(savingData.expenseRatio.toFixed(2)),
    },
    transactionCount,
    percentageChange: {
      ...percentageChange,
      previousValues: {
        incomeAmount: convertToDollarUnit(
          percentageChange.previousValues.incomeAmount
        ),
        expenseAmount: convertToDollarUnit(
          percentageChange.previousValues.expenseAmount
        ),
        balanceAmount: convertToDollarUnit(
          percentageChange.previousValues.balanceAmount
        ),
      },
    },
    preset: {
      ...range,
      value: rangeValue || DateRangeEnum.ALL_TIME,
      label: range?.label || "All Time",
    },
  };
};

function calculatePercentageChange(previous: number, current: number) {
  if (previous === 0) return current === 0 ? 0 : 100;
  const changes = ((current - previous) / Math.abs(previous)) * 100;
  const cappedChange = Math.min(Math.max(changes, -100), 100);
  return parseFloat(cappedChange.toFixed(2));
}
