import { FaCheck, FaExclamation, FaPen, FaTrash } from "react-icons/fa";

const TaskItem = ({ task, onTaskClick }) => {
  const formattedDueDate = new Date(task.dueDate).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
  console.log(task);
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
          <div className="task-actions">
            <span className="edit">
              <FaPen />
            </span>
            <span className="delete">
              <FaTrash />
            </span>
            <span className="completed">
              <FaCheck />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
