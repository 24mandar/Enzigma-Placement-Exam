import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Taskbar from './components/Taskbar';
import TaskTable from './components/TaskTable';
import TaskDetailModal from './components/TaskDetailModal'; 
import DeleteModal from './components/DeleteModal'; 
import Api from './services/TaskService'; 

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await Api.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleNewTaskClick = () => {
    setSelectedTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleDeleteTask = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const handleRefresh = () => {
    fetchTasks();
  };

  const handleTaskSubmit = async (task) => {
    try {
      if (selectedTask) {
        await Api.updateTask(selectedTask.id, task);
      } else {
        await Api.createTask(task);
      }
      fetchTasks();
      setShowTaskModal(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleTaskDelete = async () => {
    try {
      await Api.deleteTask(selectedTask.id);
      fetchTasks();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <Taskbar onRefreshClick={handleRefresh} onTaskSubmit={handleTaskSubmit} />
      <div className="container mt-3">
        <TaskTable tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
      </div>

      {showTaskModal && (
        <TaskDetailModal
          task={selectedTask}
          show={showTaskModal}
          onHide={() => setShowTaskModal(false)}
          onSave={handleTaskSubmit}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          task={selectedTask}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleTaskDelete}
        />
      )}
    </div>
  );
};

export default App;
