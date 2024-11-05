package com.springrest.courseapi.services;


import com.springrest.courseapi.entities.Appointment;
import com.springrest.courseapi.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);

    }

    public void deleteAppointmentsByPatientId(Long patientId) {
        appointmentRepository.deleteByPatientId(patientId);
    }
}
