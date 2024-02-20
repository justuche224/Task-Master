import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Task title is required"],
  },
  description: {
    type: String,
    required: [true, "Task description is required"],
  },
  dueDate: {
    type: Date,
    required: [true, "Task due date is required"],
    validate: {
      validator: (dueDate) => dueDate > Date.now(),
      message: "Due date must be in the future",
    },
  },
  tags: {
    type: [String],
    default: [],
  },
  creationDateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "over_due"],
    default: "pending",
  },
});

TaskSchema.virtual("timeUntilDue").get(function () {
  const now = Date.now();
  const diff = this.dueDate.getTime() - now;
  return diff > 0 ? Math.floor(diff / (1000 * 60 * 60)) + " hours" : "Overdue";
});

TaskSchema.index({ creator: 1 });
TaskSchema.index({ status: 1 });
TaskSchema.index({ dueDate: 1 });

const Task = models?.Task || model("Task", TaskSchema);

export default Task;
