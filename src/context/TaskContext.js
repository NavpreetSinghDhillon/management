import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // Load tasks from localStorage on initial render
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [sortBy, setSortBy] = useState("none");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, description = "") => {
    if (!text.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text,
        description,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id, newText, newDescription) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: newText,
              description: newDescription,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
    setEditingTask(null);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const sortTasks = (sortMethod) => {
    setSortBy(sortMethod);
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  // Sort tasks based on current sort method
  const sortedAndFilteredTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "alphabetical":
        return a.text.localeCompare(b.text);
      case "recently-updated":
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      default:
        return 0;
    }
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    active: tasks.filter((t) => !t.completed).length,
    withDescriptions: tasks.filter(
      (t) => t.description && t.description.trim() !== ""
    ).length,
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: sortedAndFilteredTasks,
        allTasks: tasks,
        stats,
        addTask,
        toggleTask,
        deleteTask,
        updateTask,
        setFilter,
        filter,
        editingTask,
        setEditingTask,
        clearCompleted,
        sortTasks,
        sortBy,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
