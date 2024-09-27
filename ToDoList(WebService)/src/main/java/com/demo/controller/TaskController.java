package com.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.beans.Task;
import com.demo.service.TaskService;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Get all tasks
    @GetMapping
    public List<Task> fetchAllTasks() {
        return taskService.getAllTasks();
    }

    // Get a task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> fetchTaskById(@PathVariable int id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new task
    @PostMapping
    public ResponseEntity<Task> addNewTask(@RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    // Update an existing task by ID
    @PutMapping("/{id}")
    public ResponseEntity<Task> modifyTask(@PathVariable int id, @RequestBody Task taskDetails) {
        Task updatedTask = taskService.updateTask(id, taskDetails);
        return ResponseEntity.ok(updatedTask);
    }

    // Patch task status or other partial updates
    @PatchMapping("/{id}")
    public ResponseEntity<Task> modifyTaskStatus(@PathVariable int id, @RequestBody Task updates) {
        Task updatedTask = taskService.patchTask(id, updates);
        return ResponseEntity.ok(updatedTask);
    }

    // Delete a task by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeTask(@PathVariable int id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully.");  
    }
}
