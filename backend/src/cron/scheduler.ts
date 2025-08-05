import cron from "node-cron";
import { processRecurringTransaction } from "./jobs/transaction-jobs";
import { processReportJob } from "./jobs/report-job";

const scheduleJob = (name: string, time: string, job: Function) => {
  console.log(`Scheduling ${name} as ${time}`);

  return cron.schedule(
    time,
    async () => {
      try {
        await job();
        console.log(`${name} completed`);
      } catch (error) {
        console.log(`${name} failed`, error);
      }
    },
    {
      scheduled: true,
      timezone: "UTC",
    }
  );
};

export const startJobs = () => {
  return [
    scheduleJob(`Transactions`, `5 0 * * *`, processRecurringTransaction),

    // run 2:30am every first of the month
    scheduleJob(`Reports`, `30 2 1 * *`, processReportJob),
  ];
};
