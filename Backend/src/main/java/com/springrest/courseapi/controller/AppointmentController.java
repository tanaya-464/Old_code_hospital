package com.springrest.courseapi.controller;

import com.springrest.courseapi.entities.Appointment;
import com.springrest.courseapi.repositories.AppointmentRepository;
import com.springrest.courseapi.repositories.PatientRepository;
import com.springrest.courseapi.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import com.springrest.courseapi.entities.Doctor;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        Appointment createdAppointment = appointmentService.createAppointment(appointment);
        return ResponseEntity.ok(createdAppointment);
    }
    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {

        appointmentRepository.deleteById(id);
    }

    @GetMapping("/count")
    public ResponseEntity<?> getPatientCount() {
        try {
            long count = appointmentRepository.count(); // Count the total number of patients
            return ResponseEntity.ok().body("{\"count\": " + count + "}"); // Return the count in JSON format
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching appointment count: " + e.getMessage());
        }
    }
}

