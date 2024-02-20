"use client";
import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Modal from "./Modal";

const TaskContainer = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!session) return;

      try {
        const response = await fetch("/api/task", {
          headers: {
            "Content-Type": "application/json",
            "user-id": session.user.id,
          },
        });
        const data = await response.json();
        // Calculate overdue status for each task
        const updatedTasks = data.map((task) => ({
          ...task,
          isOverdue: new Date(task.dueDate) < new Date(),
        }));
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [session]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  if (!session) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold">Please Log In to View Your Tasks</h1>
        <button
          type="button"
          className="px-3 py-2 bg-blue-700 text-white hover:opacity-80 mt-2 rounded-md"
        >
          <Link href="http://localhost:3000/auth/signin">
            Log In or Sign Up
          </Link>
        </button>
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <Modal selectedTask={selectedTask} setShowModal={setShowModal} />
      )}
      <div className="task-container">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} onTaskClick={handleTaskClick} />
        ))}
      </div>
    </>
  );
};

export default TaskContainer;
