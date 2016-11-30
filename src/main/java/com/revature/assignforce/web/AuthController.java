package com.revature.assignforce.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@RestController
@RequestMapping(value = "/api/v2")
public class AuthController {




	@RequestMapping(value="/authorize",method=RequestMethod.GET)
	public void initSetup(@RequestParam String redirect_url, HttpSession session, HttpServletResponse response) throws IOException{
		System.out.println(session.getId());
		String sToken = (String) session.getAttribute("token");

		if(sToken == null){
			response.sendRedirect("https://sf.aduet.tech/services/auth?redirect_url=http://dev2.aduet.tech/api/v2/token");
		}
	}
	
	@RequestMapping(value="/token")
	public void getToken(@RequestParam(required = false) String token, HttpSession session, HttpServletResponse response) throws IOException {
		System.out.println(session.getId());
	}
}
