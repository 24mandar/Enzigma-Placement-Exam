package com.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.beans.Task;
import com.demo.dao.TaskDao;

@Service
public class TaskService {

    @Autowired
    private TaskDao taskdao;

    public List<Task> getAllTasks() {
        return taskdao.findAll();
    }

    public Optional<Task> getTaskById(int id) {
        return taskdao.findById(id);
    }

    public Task createTask(Task task) {
        return taskdao.save(task);
    }

    public Task updateTask(int id, Task taskDetails) {
        Task task = taskdao.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setAssignedTo(taskDetails.getAssignedTo());
        task.setStatus(taskDetails.getStatus());
        task.setDueDate(taskDetails.getDueDate());
        task.setPriority(taskDetails.getPriority());
        task.setComments(taskDetails.getComments());
        return taskdao.save(task);
    }

    public void deleteTask(int id) {
    	taskdao.deleteById(id);
    }

	public Task patchTask(int id, Task updates) {
		Optional<Task> t= taskdao.findById(id);
		Task task=t.get();
	    if (updates.getAssignedTo() != null) {
	        task.setAssignedTo(updates.getAssignedTo());
	    }
	    if (updates.getDueDate() != null) {
	        task.setDueDate(updates.getDueDate());
	    }
	    if (updates.getStatus() != null) {
	        task.setStatus(updates.getStatus());
	    }
	    if (updates.getPriority() != null) {
	        task.setPriority(updates.getPriority());
	    }
	    if (updates.getComments() != null) {
	        task.setComments(updates.getComments());
	    }
		
		return taskdao.save(task);
	}
}
