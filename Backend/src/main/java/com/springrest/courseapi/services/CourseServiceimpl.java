//package com.springrest.courseapi.services;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.springrest.courseapi.dao.CourseDao;
//import com.springrest.courseapi.entities.Courses;
//
//@Service
//public class CourseServiceimpl implements CourseService{
//
//	//List<Courses> list;
//	@Autowired
//	private CourseDao courseDao;
//	List list =new ArrayList<>();
//	public CourseServiceimpl() {
//
//
//		  list.add(new
//		  Courses(145,"Java Core Course","this course contains basics of java"));
//		  list.add(new
//		  Courses(150,"spring boot course","creating rest api using springboot"));
//
//	}
//
//	@Override
//	public List<Courses> getCourses() {
//		// TODO Auto-generated method stub
//		return courseDao.findAll();
//	}
//
//	@SuppressWarnings("deprecation")
//	@Override
//	public Courses getCourse(long l) {
//		// TODO Auto-generated method stub
//		/*
//		 * Courses c = null; for(Courses course : list) { if(course.getId()==l) { c =
//		 * course; break; } } return c;
//		 */
//		return courseDao.getOne(l);
//	}
//
//	@Override
//	public Courses addCourse(Courses course) {
//		// TODO Auto-generated method stub
//		list.add(course);
//		courseDao.save(course);
//		return course;
//	}
//
//	@Override
//	public Courses updateCourse(Courses course) {
//		// TODO Auto-generated method stub
//		/*
//		 * Courses c = getCourse(course.getId()); //c.setId(course.getId()); if(c!=null)
//		 * { c.setTitle(course.getTitle()); c.setDescription(course.getDescription()); }
//		 *
//		 * return c;
//		 */
//		courseDao.save(course);
//		return course;
//	}
//
//	public void deleteCourse(long parseLong) {
//		/*
//		 * list =
//		 * this.list.stream().filter(c->c.getId()!=parseLong).collect(Collectors.toList(
//		 * ));
//		 */
//		Courses c  = courseDao.getOne(parseLong);
//		courseDao.delete(c);
//	}
//
//}
