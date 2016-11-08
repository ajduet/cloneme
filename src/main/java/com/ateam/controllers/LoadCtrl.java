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
	
	@RequestMapping(value="/home", method=RequestMethod.GET)
	public String home(){
		System.out.println("home direction");
		
		return "forward: resources/staticpages/home.html";	// not really sure what to return here
	}
		
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
		
		if((!userName.equals("ravi.singh") || !password.equals("@revature_ravi_singh!")) ||
				(!userName.equals("rev.dev") || !password.equals("@rev_dev!"))){
			return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
		}else{
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}
		
//		//extract the authorization code
//		String authCode = request.getParameter("code");
//		SFWSAccessor sfAccessor = new SFWSAccessor();
//		SFWSAccessObject sfAccess;
//
//		//client keys
//		String clientId = "3MVG9bx.kiqxiA6ZMQErdHzfMtKe8sqAvAo6Waq2eqsHE9xE_B0TwJZ65npFtCDp7kJK7Q8IpCUO0EnUKWc5b"; //required for salesforce as the consumer key;
//		String redirect = "https://dev.aduet.tech"; //required by salesforce for calling back to the app
//		String clientSecret = "2162566647397604584";
//
//		//if authCode is there the the user has logged in
//		//but we still need to get an access token
//		//if authCode is null we need to start the login process
//
//		if (authCode == null) {
//			response.sendRedirect(sfAccessor.getAuthorizationUrl(clientId, redirect, null));
//		} else {
//			//GET THE ACCESS TOKEN
//			sfAccess = sfAccessor.getAccessToken(clientId, clientSecret, redirect, authCode, null);
//		}
	}
	
	
}
