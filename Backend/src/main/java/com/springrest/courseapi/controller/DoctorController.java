package com.springrest.courseapi.controller;

import com.springrest.courseapi.entities.Doctor;
import com.springrest.courseapi.exception.ResourceNotFoundException;
import com.springrest.courseapi.repositories.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @PostMapping
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable Long id) {
        doctorRepository.deleteById(id);
    }

    @PutMapping("/{id}") // Endpoint for updating doctor
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody Doctor doctorDetails) {
        // Fetch the existing doctor
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));

        // Update the doctor's details
        doctor.setName(doctorDetails.getName());
        doctor.setSpecialty(doctorDetails.getSpecialty());

        // Save the updated doctor
        Doctor updatedDoctor = doctorRepository.save(doctor);
        return ResponseEntity.ok(updatedDoctor);
    }
    @GetMapping("/count")
    public ResponseEntity<?> getPatientCount() {
        try {
            long count = doctorRepository.count(); // Count the total number of patients
            return ResponseEntity.ok().body("{\"count\": " + count + "}"); // Return the count in JSON format
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching doctor count: " + e.getMessage());
        }
    }
}

