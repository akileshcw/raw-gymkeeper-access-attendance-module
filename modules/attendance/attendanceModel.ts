import { startOfDay, endOfDay } from "date-fns";
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAttendanceModel extends Document {
  referenceId: { type: Schema.Types.ObjectId };
  timeIn: Date;
  timeOut: Date;
  present: boolean;
  duration: number;
  branchId: { type: Schema.Types.ObjectId; ref: "Branches" };
}

interface CustomError extends Error {
  status: number;
}

class CustomError extends Error {
  status: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;
  }
}

const attendanceSchema: Schema<IAttendanceModel> = new Schema<IAttendanceModel>(
  {
    referenceId: Schema.Types.ObjectId,
    timeIn: Date,
    timeOut: Date,
    present: Boolean,
    duration: Number,
    branchId: { type: Schema.Types.ObjectId, ref: "Branches" },
  },
  {
    timestamps: true,
  }
);

// Define the pre-save middleware to check if the member has already logged the attendance for today
attendanceSchema.pre<IAttendanceModel>("save", async function (next) {
  const doc = this;
  try {
    if (!doc.isNew) return next();

    // Get the start and end of the day for the timeIn date
    const startOfDayTimeIn = startOfDay(doc.timeIn);
    const endOfDayTimeIn = endOfDay(doc.timeIn);

    // Check if an attendance record exists for the same member on the current date
    const existingAttendance = await Attendance.findOne({
      referenceId: doc.referenceId,
      timeIn: { $gte: startOfDayTimeIn, $lte: endOfDayTimeIn },
    });

    if (existingAttendance) {
      // If a record exists, prevent saving the new attendance document
      const error = new CustomError(
        "Attendance record already exists for this member on the same date.",
        400
      );
      return next(error);
    }

    // If no existing record, proceed with saving
    next();
  } catch (error: any) {
    return next(error);
  }
});

const Attendance: Model<IAttendanceModel> =
  mongoose.models.Attendance ||
  mongoose.model<IAttendanceModel>("Attendance", attendanceSchema);

export default Attendance;
