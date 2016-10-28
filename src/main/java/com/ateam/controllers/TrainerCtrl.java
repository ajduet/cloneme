package com.ateam.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ateam.domain.Trainer;
import com.ateam.service.TrainerService;

@RestController
public class TrainerCtrl {
	
	@Autowired
	TrainerService trainerServiceImpl;
	
	@RequestMapping(value="/savetrainer", method=RequestMethod.POST,
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Trainer> saveTrainer(Trainer t){
		System.out.println("Saving trainer: " + t);
		
		trainerServiceImpl.saveTrainer(t);
		
		return new ResponseEntity<Trainer>(t, HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/viewtrainers", method=RequestMethod.GET, 
					produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Trainer>> getTrainers(){
		System.out.println("Getting Trainers...");
		
		List<Trainer> trainers = trainerServiceImpl.getTrainers();
		
		return new ResponseEntity<List<Trainer>>(trainers, HttpStatus.OK);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Exception> trainerException(Exception e){
		System.out.println("You've received an exception");
		
		return new ResponseEntity<Exception>(e, HttpStatus.CONFLICT);
	}
	
}
