import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <ul className="task-list">
      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found. Add a new task to get started!</p>
        </div>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </ul>
  );
};

export default TaskList;
