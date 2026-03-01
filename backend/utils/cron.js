import cron from "node-cron";
import Capsule from "../models/capsule.model.js";
import mongoose from "mongoose";

const cronJob = cron.schedule(
  "* * * * * *",
  async () => {
    try {
      const now = new Date();
      const capsulesToUpdate = await Capsule.find({
        isSealed: true,
        $expr: {
          $lte: [
            {
              $dateFromString: {
                dateString: { $concat: ["$openDate", "T", "$openTime"] },
                timezone: "+05:45", // Nepal Time
              },
            },
            now,
          ],
        },
      });

      if (capsulesToUpdate.length > 0) {
        await Capsule.updateMany(
          { _id: { $in: capsulesToUpdate.map((c) => c._id) } },
          { isSealed: false },
        );
      }
    } catch (err) {
      console.error("Cron job error:", err);
    }
  },
  { scheduled: false },
); // export without starting

export default cronJob;
