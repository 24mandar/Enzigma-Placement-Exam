package com.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.beans.Task;

@Repository
public interface TaskDao extends JpaRepository<Task, Integer> {

}
