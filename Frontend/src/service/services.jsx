import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:9090' });

export const signupPatient = (data) => API.post('/patients/signup', data);
export const loginPatient = (data) => API.post('/patients/login', data);
export const getDoctors = () => API.get('/doctors');
export const bookAppointment = (data) => API.post('/appointments', data);
export const getPatientAppointments = (patientId) => API.get(`/patients/${patientId}/appointments`);
export const addDoctor = (data) => API.post('/doctors', data);
export const deleteAppointment = (appointmentId) => API.delete(`/appointments/${appointmentId}`);
