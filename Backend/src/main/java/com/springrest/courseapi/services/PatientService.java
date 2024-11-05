//package com.springrest.courseapi.services;
//
//import com.springrest.courseapi.entities.Patient;
//import com.springrest.courseapi.repositories.PatientRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//public class PatientService {
//    private final PatientRepository patientRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    public Patient register(Patient patient) {
//        patient.setPassword(passwordEncoder.encode(patient.getPassword()));
//        return patientRepository.save(patient);
//    }
//
//    public Optional<Patient> findByEmail(String email) {
//        return patientRepository.findByEmail(email);
//    }
//}
//
