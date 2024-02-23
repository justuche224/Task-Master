"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/forms/Form";

const UpdatePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id");
  const [newTask, setNewTask] = useState(null);
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!taskId) {
        router.push("/error?message=missing-post-id");
        return;
      }

      const response = await fetch(`/api/task/${taskId}`);
      const data = await response.json();

      if (!data || !data.success) {
        // Handle data fetch error (show error message, redirect)
        return;
      }

      setNewTask(data.post);
    };

    fetchPost();
  }, [taskId, router]);

  const handleInputChange = (field, value) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      dueDate: value,
    }));
  };

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(",").map((tag) => tag.trim());
    setNewTask((prevTask) => ({
      ...prevTask,
      tags: tagsArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    setIsSubmitting(true);
    // console.log(taskId);
    // if (!taskId) return alert("No Task id found!");

    try {
      const response = await fetch(`/api/task/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      {newTask ? (
        <Form
          type="Update"
          newTask={newTask}
          setNewTask={setNewTask}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          handleTagsChange={handleTagsChange}
          submitting={submitting}
          handleSubmit={handleSubmit}
        />
      ) : (
        <h1>Loading Task....</h1>
      )}
    </div>
  );
};

export default UpdatePost;
