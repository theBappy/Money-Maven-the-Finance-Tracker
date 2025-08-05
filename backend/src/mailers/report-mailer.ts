import { ReportType } from "../@types/report.types";
import { formatCurrency } from "../utils/format-currency";
import { sendEmail } from "./mailer";
import { getReportEmailTemplate } from "./template/report-template";


type ReportEmailParams = {
  email: string;
  username: string;
  report: ReportType;
  frequency: string;
};

export const sendReportEmail = async (params: ReportEmailParams) => {
  const { email, username, report, frequency } = params;
  const html = getReportEmailTemplate(
    {
      username,
      ...report,
    },
    frequency
  );
  const text = `Your ${frequency} Financial Report (${report.period})
    Income: ${formatCurrency(report.totalIncome)}
    Expenses: ${formatCurrency(report.totalExpenses)}
    Balance: ${formatCurrency(report.availableBalance)}
    Savings Rate: ${report.savingRate.toFixed(2)}%

    ${report.insights.join("\n")}`;

    console.log(text, "text mail");

    return sendEmail({
    to: email,
    subject: `${frequency} Financial Report - ${report.period}`,
    text,
    html,
  });
};
