import cron from "node-cron";
import Capsule from "../models/capsule.model.js";

const cronJob = cron.schedule(
  "* * * * *", // runs every minute — sufficient for date+time precision
  async () => {
    try {
      const now = new Date();

      const result = await Capsule.updateMany(
        {
          isSealed: true,
          $expr: {
            $lte: [
              {
                $dateFromString: {
                  dateString: { $concat: ["$openDate", "T", "$openTime"] },
                  timezone: "+05:45", // Nepal Time (NST)
                },
              },
              now,
            ],
          },
        },
        { isSealed: false },
      );

      if (result.modifiedCount > 0) {
        console.log(
          `[Cron] Unsealed ${result.modifiedCount} capsule(s) at ${now.toISOString()}`,
        );
      }
    } catch (err) {
      console.error("[Cron] Error:", err);
    }
  },
  { scheduled: false },
);

export default cronJob;
