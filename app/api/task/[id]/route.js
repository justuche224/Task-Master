import Task from "@/models/task";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params: { id } }) => {
  try {
    await connectToDB();

    const task = await Task.findById(id).populate("creator");
    if (!task) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify({ success: true, post: task }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  console.log("recieved request");
  const post = await request.json();
  try {
    await connectToDB();
    console.log("connected to database");
    let existingTask = await Task.findById(params.id);

    if (!existingTask) {
      return new Response("Task not found", { status: 404 });
    }

    console.log("found task");
    for (const prop in post) {
      existingTask[prop] = post[prop];
    }
    console.log("equated");

    await existingTask.save();
    console.log("saved task");
    return new Response("Successfully updated the Task", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Task", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Task.findByIdAndDelete(params.id);

    return new Response("Task deleted successfully", { status: 200 });
  } catch (error) {
    return new Response(`Error deleting task: ${error}`, { status: 500 });
  }
};
