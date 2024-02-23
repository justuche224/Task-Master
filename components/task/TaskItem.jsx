import Link from "next/link";
import { FaCheck, FaExclamation, FaPen, FaTrash } from "react-icons/fa";

const TaskItem = ({
  task,
  onTaskClick,
  handleDeleteTask,
  markTaskCompleted,
}) => {
  const formattedDueDate = new Date(task.dueDate).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const handleClickDelete = () => {
    handleDeleteTask(task);
  };

  const handleClickCompleted = () => {
    console.log(task);
    markTaskCompleted(task);
  };

  return (
    <div className="task" onClick={() => onTaskClick(task)}>
      <div className="task-card">
        <div className="task-header">
          <h1 className="task-title">{task.title}</h1>
          {task.isOverdue && (
            <span className="task-priority">
              <FaExclamation />
            </span>
          )}
        </div>
        <hr className="task-divider" />
        <p className="task-description">{task.description}</p>
        <div className="task-footer">
          <p className="task-deadline">
            Due <span className="text-base italic">{formattedDueDate}</span>
          </p>
          <div
            className="task-actions"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {task.status === "completed" ? (
              <span className="italic text-green-500">completed</span>
            ) : (
              <>
                <span className="edit fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
                  <Link href={`/update-task?id=${task._id}`}>
                    <FaPen />
                  </Link>
                </span>

                <span
                  className="completed fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200"
                  onClick={handleClickCompleted}
                >
                  <FaCheck />
                </span>
              </>
            )}
            <span
              className="delete fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200"
              onClick={handleClickDelete}
            >
              <FaTrash />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
