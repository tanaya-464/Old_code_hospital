package com.springrest.courseapi.repositories;
import com.springrest.courseapi.entities.Doctor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
public interface DoctorRepository extends JpaRepository<Doctor, Long> {}

