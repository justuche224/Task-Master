import Task from "@/models/task";
import { connectToDB } from "@/utils/database";

export const POST = async (request, { params }) => {
  console.log("request recived");
  try {
    await connectToDB();

    const taskId = params.id;
    console.log(params);
    const existingTask = await Task.findById(taskId);
    console.log("found taskd");
    if (!existingTask) {
      return new Response("Task not found", { status: 404 });
    }

    existingTask.status = "completed";
    await existingTask.save();
    console.log("saved task");

    return new Response("Task status updated to completed", { status: 200 });
  } catch (error) {
    return new Response(`Error updating task status: ${error}`, {
      status: 500,
    });
  }
};
