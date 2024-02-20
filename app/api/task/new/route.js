import Task from "@/models/task";
import { connectToDB } from "@/utils/database";
import mongoose from "mongoose";

export const POST = async (req) => {
  const newTaskData = await req.json();
  newTaskData.creationDateTime = new Date();
  newTaskData.status = "pending";
  console.log(newTaskData); // Log newTaskData before creating the Task instance

  // Add _id field to the newTaskData object
  newTaskData._id = new mongoose.Types.ObjectId();

  try {
    await connectToDB();
    const newTask = new Task(newTaskData);

    // Log the newTask object before saving
    console.log("2");
    console.log(newTask);

    // Save the newTask
    await newTask.save();

    // Log confirmation message after successful save
    console.log("Task saved successfully");

    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    // Log any errors that occur during task creation or saving
    console.log("Error creating or saving task:", error);

    // Return an appropriate error response
    return new Response("Failed to create a new task", { status: 500 });
  }
};
