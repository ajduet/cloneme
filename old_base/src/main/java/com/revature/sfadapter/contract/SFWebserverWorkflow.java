package com.revature.sfadapter.contract;

import java.util.Map;

import com.revature.sfadapter.util.SFWSAccessObject;

public interface SFWebserverWorkflow {
	
	String getAuthorizationUrl(String clientId, String callback, Map<String, String> optionalParams);
	SFWSAccessObject getAccessToken(String clientId, String clientSecret, String callback, String authCode, Map<String, String>optionalParams);
}
