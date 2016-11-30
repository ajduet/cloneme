package com.revature.assignforce.web;

import java.io.IOException;

import com.revature.assignforce.service.AuthService;
import com.revature.assignforce.util.HttpSessionCollector;
import io.jsonwebtoken.lang.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionListener;

@RestController
@RequestMapping(value = "/api/v2")
public class AuthController {


	@Autowired
	private HttpSessionListener httpSessionListener;

	@RequestMapping(value="/authorize",method=RequestMethod.GET)
	public void initSetup(@RequestParam String redirect_url, HttpServletRequest request, HttpServletResponse response) throws IOException{
		String sToken = (String) request.getSession().getAttribute("token");
		request.getSession().setAttribute("redirect", redirect_url);

		if(sToken == null){
			response.sendRedirect(String.format("https://sf.aduet.tech/services/auth?redirect_url=http://dev2.aduet.tech/api/v2/token?id=%s", request.getSession().getId()));
		}
	}
	
	@RequestMapping(value="/token")
	public void getToken(@RequestParam String token, @RequestParam String id, HttpServletResponse response) throws IOException {

		HttpSession session = ((HttpSessionCollector)httpSessionListener).find(id);
		session.setAttribute("token", token);
		String redirect = (String) session.getAttribute("redirect");
		response.sendRedirect(String.format("%s?token=%s", redirect, token));
	}
}
