package com.ateam.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ateam.domain.Room;
import com.ateam.service.DaoService;

@RestController
public class RoomCtrl {

	@Autowired
	DaoService daoService;

	@RequestMapping(value = { "/getRooms"}, 
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Room>> getRooms() {

		List<Room> re = daoService.getAllItem(new Room());

		return new ResponseEntity<List<Room>>(re, HttpStatus.OK);
	}

//	@RequestMapping(value = { "/saveRoom"}, 
//			method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE,
//			produces = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<Location> saveLocation(@RequestBody Location loc) {
//
//		loc = daoService.saveItem(loc);
//		
//		return new ResponseEntity<Location>(loc, HttpStatus.OK);
//	}//end getCurriculums()


}

