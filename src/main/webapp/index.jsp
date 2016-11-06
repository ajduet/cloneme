<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="com.revature.sfadapter.util.*" %>
<!-- This page should be used to replace index.jsp in the tomcat server in the ROOT directory
	the intent is for this page to facilitate authentication with SalesForce -->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	//extract the authorization code
	String authCode = request.getParameter("code");
	SFWSAccessor sfAccessor = new SFWSAccessor();
	
	//if authCode is there the the user has logged in
	//but we still need to get an access token
	//if authCode is null we need to start the login process
	
	if(authCode == null){
		String clientId = "3MVG9bx.kiqxiA6ZMQErdHzfMtKe8sqAvAo6Waq2eqsHE9xE_B0TwJZ65npFtCDp7kJK7Q8IpCUO0EnUKWc5b"; //required for salesforce as the consumer key;
		String redirect = "https://dev.aduet.tech"; //required by salesforce for calling back to the app
		response.sendRedirect(sfAccessor.getAuthorizationUrl(clientId, redirect, null));
	}else{
		
	}
	
 %>
</head>
<body>

</body>
</html>