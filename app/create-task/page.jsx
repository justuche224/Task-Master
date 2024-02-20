"use client";

import Form from "@/components/forms/Form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    tags: [],
  });

  const handleInputChange = (field, value) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    // No need to parse the input value here if it's already in the correct format
    setNewTask((prevTask) => ({
      ...prevTask,
      dueDate: value, // Update dueDate directly without parsing it
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
    setSubmitting(true);
    try {
      // Parse the dueDate before sending the data
      const parsedDueDate = new Date(newTask.dueDate);
      const response = await fetch("/api/task/new", {
        method: "POST",
        body: JSON.stringify({
          ...newTask,
          dueDate: parsedDueDate, // Replace the dueDate with the parsed value
          creator: session?.user.id,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Create"
        newTask={newTask}
        setNewTask={setNewTask}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
        handleTagsChange={handleTagsChange}
        submitting={submitting}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Page;
