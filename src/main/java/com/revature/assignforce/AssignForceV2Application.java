package com.revature.assignforce;

import com.revature.assignforce.util.HttpSessionCollector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.servlet.http.HttpSessionListener;

/**
 * Application Entry Point
 */
@SpringBootApplication
@EnableJpaRepositories(basePackages={"com.revature.assignforce.domain.dao"})
@EntityScan("com.revature.assignforce.domain")
public class AssignForceV2Application {

	@Autowired
	private HttpSessionCollector sessions;

	public static void main(String[] args) {
		SpringApplication.run(AssignForceV2Application.class, args);
	}

	@Bean
	HttpSessionListener httpSessionListener(){
		return sessions;
	}
}
