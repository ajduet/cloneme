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

import com.ateam.domain.Batch;
import com.ateam.service.ViewBatchService;

@RestController
public class ViewBatchCtrl {
	
	@Autowired
	ViewBatchService viewBatchService;

	@RequestMapping(value = "/viewbatches", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Batch>> getTrainers() {
		System.out.println("Getting Batches...");

		List<Batch> batches = viewBatchService.getBatches();

		return new ResponseEntity<List<Batch>>(batches, HttpStatus.OK);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<Exception> batchException(Exception e) {
		System.out.println("You've received an exception");

		return new ResponseEntity<Exception>(e, HttpStatus.CONFLICT);
	}

}
