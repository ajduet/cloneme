package com.ateam.controllers;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.revature.sfadapter.util.SFWSAccessObject;
import com.revature.sfadapter.util.SFWSAccessor;

@Controller
public class LoadCtrl {
	
	@RequestMapping(value="/home", method=RequestMethod.GET)
	public String home(){
		System.out.println("home direction");
		
		return "forward: resources/staticpages/home.html";	// not really sure what to return here
	}
		
	@RequestMapping(value="/authorize", method=RequestMethod.GET)
	public String initSetup(ModelMap modelMap, HttpServletRequest request, HttpServletResponse response)throws IOException{
		//extract the authorization code
		String authCode = request.getParameter("code");
		SFWSAccessor sfAccessor = new SFWSAccessor();
		SFWSAccessObject sfAccess;

		//client keys
		String clientId = "3MVG9bx.kiqxiA6ZMQErdHzfMtKe8sqAvAo6Waq2eqsHE9xE_B0TwJZ65npFtCDp7kJK7Q8IpCUO0EnUKWc5b"; //required for salesforce as the consumer key;
		String redirect = "https://dev.aduet.tech"; //required by salesforce for calling back to the app
		String clientSecret = "2162566647397604584";

		//if authCode is there the the user has logged in
		//but we still need to get an access token
		//if authCode is null we need to start the login process

		if (authCode == null) {
			response.sendRedirect(sfAccessor.getAuthorizationUrl(clientId, redirect, null));
		} else {
			//GET THE ACCESS TOKEN
			sfAccess = sfAccessor.getAccessToken(clientId, clientSecret, redirect, authCode, null);
		}
		
		return null;
	}
	
	
}
