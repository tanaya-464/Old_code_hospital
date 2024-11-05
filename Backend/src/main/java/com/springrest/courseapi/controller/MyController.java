//package com.springrest.courseapi.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.springrest.courseapi.entities.Courses;
//import com.springrest.courseapi.services.CourseService;
//
//@RestController
//public class MyController {
//
//	@Autowired
//	private CourseService courseservice;
//	@GetMapping("/home")
//	public String home() {
//		return "welcome to courses apllication";
//	}
//
//	@GetMapping("/login")
//	public String login() {
//		return "authentication needed!!!";
//	}
//
//	//get the courses
//	@GetMapping("/courses")
//	public List<Courses> getCourses(){
//
//		return this.courseservice.getCourses();
//	}
//
//	@GetMapping("/courses/{courseId}")
//	public Courses getCourse(@PathVariable String courseId) {
//		return this.courseservice.getCourse(Long.parseLong(courseId));
//	}
//
//	@PostMapping("/addcourses")
//	public Courses addCourse(@RequestBody Courses course) {
//		return this.courseservice.addCourse(course);
//
//	}
//	@PutMapping("/courses")
//	public Courses updateCourse(@RequestBody Courses course) {
//
//		return this.courseservice.updateCourse(course);
//	}
//
//	@DeleteMapping("/courses/{courseId}")
//	public ResponseEntity<HttpStatus> deleteCourse(@PathVariable String courseId){
//		try {
//			this.courseservice.deleteCourse(Long.parseLong(courseId));
//			return new ResponseEntity<>(HttpStatus.OK);
//		}
//		catch(Exception e){
//			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//
//	}
//}
