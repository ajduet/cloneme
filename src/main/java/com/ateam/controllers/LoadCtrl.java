//package com.ateam.controllers;
//
//import javax.servlet.http.HttpServletRequest;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.ModelMap;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.ResponseStatus;
//
//import com.ateam.service.InitService;
//
//@Controller
//public class LoadCtrl {
//	@Autowired
//	private InitService initService;
//	
//	@RequestMapping(value="/home", method=RequestMethod.GET)
//	public String home(){
//		System.out.println("home direction");
//		
//		return "forward: resources/staticpages/home.html";	// not really sure what to return here
//	}
//		
//	@RequestMapping(value="/init", method=RequestMethod.GET)
//	@ResponseStatus(HttpStatus.OK)
//	public String initSetup(ModelMap modelMap){
//		
//		initService.initSetup();	// run the setup
//		return null;	// not really sure what to return here
//	}
//	
//	
//}
