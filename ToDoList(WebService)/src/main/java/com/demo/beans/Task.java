package com.demo.beans;


import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String assignedTo;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    private String comments;
    
    public enum Status {
        NOT_STARTED,
        IN_PROGRESS,
        COMPLETED;
    }
    
    public enum Priority {
        LOW,
        NORMAL,
        HIGH;
    }
    

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    @Override
    public String toString() {
        return "Task [id=" + id + ", assignedTo=" + assignedTo + ", status=" + status + ", dueDate=" + dueDate
                + ", priority=" + priority + ", comments=" + comments + "]";
    }
}
