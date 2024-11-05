package com.springrest.courseapi.controller;

import com.springrest.courseapi.entities.Patient;
import com.springrest.courseapi.exception.ResourceNotFoundException;
import com.springrest.courseapi.repositories.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {
    @Autowired
    private PatientRepository patientRepository;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientRepository.deleteById(id);
    }

    @PutMapping("/{id}") // New endpoint for updating patient
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patientDetails) {
        Patient patient = patientRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));
        System.out.println(patientDetails.getAge());
        System.out.println(patient);
        patient.setName(patientDetails.getName());
        patient.setAge(patientDetails.getAge());
        patient.setGender(patientDetails.getGender());
        patient.setContactNumber(patientDetails.getContactNumber());

        Patient updatedPatient = patientRepository.save(patient);
        return ResponseEntity.ok(updatedPatient);
    }
    @GetMapping("/count")
    public ResponseEntity<?> getPatientCount() {
        try {
            long count = patientRepository.count(); // Count the total number of patients
            return ResponseEntity.ok().body("{\"count\": " + count + "}"); // Return the count in JSON format
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching patient count: " + e.getMessage());
        }
    }
}

