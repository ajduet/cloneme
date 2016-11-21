package com.ateam.controllers;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController

public class LoadCtrl {
	
	
	@RequestMapping(value="/authorize", method=RequestMethod.POST)
	public ResponseEntity<Boolean> initSetup(ModelMap modelMap, @RequestBody String credentials){
		
		ObjectMapper mapper = new ObjectMapper();
		JsonNode obj = null;
		try {
			obj = mapper.readTree(credentials);
		} catch (JsonProcessingException e) {
			return new ResponseEntity<Boolean>(false, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (IOException e) {
			return new ResponseEntity<Boolean>(false, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		String userName = obj.get("username").textValue();
		String password = obj.get("password").textValue();
		
		
		if("ravi.singh".equals(userName) && "@revature_ravi_singh!".equals(password)){
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}else if("rev.dev".equals(userName) && "@rev_dev!".equals(password)){
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}else{
			return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
		}
	}
	
	
}
