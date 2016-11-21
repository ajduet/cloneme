package com.ateam.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ateam.dao.TrainerDao;
import com.ateam.domain.Trainer;
import com.ateam.service.DaoService;

@RestController
public class TrainerInfoCtrl {

	@Autowired
	DaoService daoService;
	
	@Autowired
	TrainerDao tdao;

	@RequestMapping(value = { "/getTrainer"}, 
			method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Trainer> getTrainer(@RequestBody int tId) {
		Trainer re = daoService.findTrainerById(tId);

		return new ResponseEntity<Trainer>(re, HttpStatus.OK);
	}//end getCurriculums()

/*	@RequestMapping(value = { "/getTrainerTest"}, 
			method = RequestMethod.POST, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Trainer> getTrainerTest() {
		Trainer re = daoService.findTrainerById(4);
		return new ResponseEntity<Trainer>(re, HttpStatus.OK);
	}//end getCurriculums()

*/
	
}
