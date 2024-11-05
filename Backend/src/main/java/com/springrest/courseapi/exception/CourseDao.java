package com.springrest.courseapi.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springrest.courseapi.entities.Courses;

public interface CourseDao extends JpaRepository<Courses,Long> {

}
