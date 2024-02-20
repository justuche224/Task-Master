import { connectToDB } from "@/utils/database";
import Task from "@/models/task";

export const GET = async (request) => {
  try {
    await connectToDB();

    const userId = request.headers.get("user-id");

    const tasks = await Task.find({ creator: userId }).populate("creator");

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch tasks", { status: 500 });
  }
};
