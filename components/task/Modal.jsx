import { FaTimesCircle, FaPen, FaTrash, FaCheck } from "react-icons/fa";
import styles from "./Modal.module.css";
import Link from "next/link";

const Modal = ({
  selectedTask,
  setShowModal,
  handleDeleteTask,
  markTaskCompleted,
}) => {
  const handleClickDelete = () => {
    setShowModal(false);
    handleDeleteTask(selectedTask);
  };
  const handleClickCompleted = () => {
    markTaskCompleted(selectedTask);
  };

  const calculateElapsedTime = (dueDate) => {
    const dueDateTime = new Date(dueDate).getTime();
    const currentTime = new Date().getTime();
    const difference = dueDateTime - currentTime;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days, ${hours} hours, ${minutes} minutes`;
  };

  return (
    <div className={styles.modal} onClick={() => setShowModal(false)}>
      <div
        className={styles.modal_content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          type="button"
          className={styles.modal_close_btn}
          onClick={() => setShowModal(false)}
        >
          <FaTimesCircle size={35} />
        </button>
        <h1 className={styles.modal_title}>{selectedTask?.title}</h1>
        <p className={styles.modal_description}>{selectedTask?.description}</p>
        <p className={styles.modal_due_date}>
          Due: {calculateElapsedTime(selectedTask?.dueDate)}
        </p>
        {selectedTask.isOverdue && (
          <h1 className="text-red-500 mt-2">This Task Is Over Due</h1>
        )}
        <div className={styles.modal_buttons}>
          <button className={styles.modal_button}>
            <Link href={`/update-task?id=${selectedTask._id}`}>
              <FaPen /> Edit
            </Link>
          </button>
          <button className={styles.modal_button} onClick={handleClickDelete}>
            <FaTrash /> Delete
          </button>
          <button
            className={styles.modal_button}
            onClick={handleClickCompleted}
          >
            <FaCheck /> Mark as Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
