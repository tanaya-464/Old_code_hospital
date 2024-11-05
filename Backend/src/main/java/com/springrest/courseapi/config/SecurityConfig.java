package com.springrest.courseapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("admin")
                .password(passwordEncoder().encode("admin"))
                .roles("ADMIN");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors()
                .and()
                .authorizeRequests()
                .antMatchers("/api/signup", "/api/login").permitAll()
                .antMatchers("/api/patients").permitAll()
                .antMatchers("/api/patients/count").permitAll()
                .antMatchers("/api/doctors/count").permitAll()
                .antMatchers("/api/appointments/count").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/appointments/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/patients/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/patients/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/doctors/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/doctors/**").permitAll()
                .antMatchers("/api/doctors").permitAll()
                .antMatchers("/api/appointments").permitAll()// Ensure this endpoint is secured
                .anyRequest().authenticated();

    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
