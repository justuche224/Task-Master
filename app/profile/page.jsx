"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const completedTasks = [
    {
      taskTitle: "Fake Task",
      taskDescription:
        "Some Description goes here Some Description goes here Some Description goes here Some Description goes here Some Description goes here Some Description goes here",
      taskCreationDate: "21 Feb 2024",
      taskCompletionDate: "21 Feb 2024",
    },
    {
      taskTitle: "Fake Task",
      taskDescription: "Some Description goes here",
      taskCreationDate: "21 Feb 2024",
      taskCompletionDate: "21 Feb 2024",
    },
    {
      taskTitle: "Fake Task",
      taskDescription: "Some Description goes here",
      taskCreationDate: "21 Feb 2024",
      taskCompletionDate: "21 Feb 2024",
    },
  ];
  const totalCompletedTasks = completedTasks.length;
  return (
    <main className="mt-14 text-center">
      <h1 className="orange_gradient head_text">
        Welcome {session?.user?.name}
      </h1>
      <div className="w-full grid place-content-center">
        <h1 className="flex justify-between w-[250px]">
          <span>Total Tasks</span>
          <span>{completedTasks.length}</span>
        </h1>
        <h1 className="flex justify-between w-[250px]">
          <span>Completed Tasks</span>
          <span>{totalCompletedTasks}</span>
        </h1>
        {/* Add more task statistics here */}
      </div>
      <br />
      <div>
        <h1>Completed Tasks</h1>
        <div className="task-container">
          {/* Render completed tasks */}
          {completedTasks.map((task, i) => (
            <Task key={i} task={task} />
          ))}
        </div>
      </div>
    </main>
  );
}
const Task = ({ task }) => {
  return (
    <div className="task">
      <div className="task p-4 shadow-xl relative">
        <h1 className="task-title text-left font-bold text-xl mb-1">
          {task.taskTitle}
        </h1>
        <hr className="w-full" />
        <p className="task-description font-semibold p-3 m-3">
          {task.taskDescription}
        </p>
        <p className="task-deadline absolute bottom-0 left-3 blue_gradient font-bold">
          {task.taskCompletionDate}
        </p>
      </div>
    </div>
  );
};
