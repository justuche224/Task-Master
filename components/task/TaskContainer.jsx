"use client";
import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Modal from "./Modal";
import Loading from "@/app/loading";
import InlineLoader from "../InlineLoader";

const TaskContainer = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingTasks, setFetchingTasks] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!session) return;
      setFetchingTasks(true);
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
      } finally {
        setFetchingTasks(false);
      }
    };

    fetchTasks();
  }, [session]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = async (task) => {
    // Display confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) {
      return; // Exit if user cancels
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/task/${task._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting task: " + (await response.text()));
      }

      // Update UI immediately after successful deletion
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    } catch (error) {
      console.error("Error deleting task:", error);
      // Handle deletion error (e.g., display error message)
    } finally {
      setIsLoading(false);
    }
  };

  const markTaskCompleted = async (taskId) => {
    try {
      const response = await fetch(`/api/task/completed/${taskId._id}`, {
        method: "POST",
      });

      if (response.ok) {
        // Handle success
        console.log("Task marked as completed successfully");
      } else {
        // Handle error
        console.error("Error marking task as completed");
      }
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
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
      {isLoading && <Loading />}
      {showModal && (
        <Modal
          selectedTask={selectedTask}
          setShowModal={setShowModal}
          handleDeleteTask={handleDeleteTask}
          markTaskCompleted={markTaskCompleted}
        />
      )}
      <div className="task-container">
        {fetchingTasks && (
          <div className="w-full text-center grid place-content-center">
            <InlineLoader />
            {/* <h1 className="text-center italic text-3xl">Loading Tasks...</h1> */}
          </div>
        )}
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onTaskClick={handleTaskClick}
            handleDeleteTask={handleDeleteTask}
            markTaskCompleted={markTaskCompleted}
          />
        ))}
      </div>
    </>
  );
};

export default TaskContainer;
