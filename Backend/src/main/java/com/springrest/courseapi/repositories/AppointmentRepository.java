package com.springrest.courseapi.repositories;

import com.springrest.courseapi.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;



public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    void deleteByPatientId(Long patientId);
}
