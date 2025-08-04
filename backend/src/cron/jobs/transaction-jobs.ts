import mongoose from "mongoose";
import TransactionModel from "../../models/transaction-model";
import { calculateNextOccurrence } from "../../utils/helper";

export const processRecurringTransaction = async () => {
  const now = new Date();
  let processedCount = 0;
  let failedCount = 0;

  try {
    const transactionCursor = TransactionModel.find({
      isRecurring: true,
      nextRecurringDate: { $lte: now },
    }).cursor();

    console.log("🌀 Starting recurring transaction processing...");

    for await (const tx of transactionCursor) {
      const nextDate = calculateNextOccurrence(
        tx.nextRecurringDate!,
        tx.recurringInterval!
      );

      const session = await mongoose.startSession();

      try {
        await session.withTransaction(
          async () => {
            await TransactionModel.create(
              [
                {
                  ...tx.toObject(),
                  _id: new mongoose.Types.ObjectId(),
                  title: `Recurring - ${tx.title}`,
                  date: tx.nextRecurringDate,
                  isRecurring: false,
                  nextRecurringDate: null,
                  recurringInterval: null,
                  lastProcessed: null,
                },
              ],
              { session }
            );

            await TransactionModel.updateOne(
              { _id: tx._id },
              {
                $set: {
                  nextRecurringDate: nextDate,
                  lastProcessed: now,
                },
              },
              { session }
            );
          },
          {
            maxCommitTimeMS: 20000,
          }
        );

        processedCount++;
        console.log(`✅ Processed recurring transaction: ${tx._id}`);
      } catch (error: any) {
        failedCount++;
        console.log(`❌ Failed recurring transaction: ${tx._id}`, error?.message);
      } finally {
        await session.endSession();
      }
    }

    console.log(`\n✨ Summary`);
    console.log(`✅ Successfully processed: ${processedCount}`);
    console.log(`❌ Failed to process: ${failedCount}`);

    return {
      success: true,
      processedCount,
      failedCount,
    };
  } catch (error: any) {
    console.error("❌ Error occurred while processing transactions:", error);

    return {
      success: false,
      error: error?.message,
    };
  }
};
