import React, { useState } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 15;

  // Calculate total number of pages
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  // Calculate the tasks to display for the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <Button variant="warning" onClick={() => onEdit(task)}>Edit</Button>
                <Button variant="danger" onClick={() => onDelete(task)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <Pagination>
        <Pagination.Prev 
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1} 
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item 
            key={index + 1} 
            active={index + 1 === currentPage} 
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next 
          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages} 
        />
      </Pagination>
    </>
  );
};

export default TaskTable;
