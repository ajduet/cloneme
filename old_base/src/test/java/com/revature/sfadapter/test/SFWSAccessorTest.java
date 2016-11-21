package com.revature.sfadapter.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.revature.sfadapter.util.SFWSAccessor;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes={TestConfig.class})
public class SFWSAccessorTest {
	
	@Autowired
	private SFWSAccessor sfAccessor;
	
	@Test(expected=java.lang.IllegalArgumentException.class)
	public void throwExceptionWhenClientIdIsNullForAuthUrl(){
		String sfUrl = sfAccessor.getAuthorizationUrl(null, null, null);
		assertNotNull("The returned URL is null", sfUrl);
	}
	
	@Test(expected=java.lang.IllegalArgumentException.class)
	public void throwExceptionWhenCallbackIsNullForAuthUrl(){
		
		String clientId = "not real id";
		String sfUrl = sfAccessor.getAuthorizationUrl(clientId, null, null);
		assertNotNull("The returned URL is null", sfUrl);
	}
	
	@Test
	public void returnsProperlyFormatedUrlForAuthUrl(){
		String clientId = "notrealid";
		String callback = "https://www.someurl.com";
		String encodedUrl = null;
		try {
			encodedUrl = URLEncoder.encode(callback, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		String expectedUrl = "https://login.salesforce.com/services/oauth2/authorize?response_type=code&" + "client_id=" + clientId + "&redirect_uri=" + encodedUrl;
		String sfUrl = sfAccessor.getAuthorizationUrl(clientId, callback, null);
		
		assertEquals("The expected URL was not returned without optionalParams", expectedUrl, sfUrl);
		
		expectedUrl += "&display=popup&prompt=login";
		
		Map<String, String> paramMap = new HashMap<>();
		paramMap.put("display", "popup");
		paramMap.put("prompt", "login");
		
		sfUrl = sfAccessor.getAuthorizationUrl(clientId, callback, paramMap);
		
		assertEquals("The expected URL was not returned with optionalParams", expectedUrl, sfUrl);
	}
	
	@Test(expected=java.lang.IllegalArgumentException.class)
	public void throwExceptionForAccessToken(){
		sfAccessor.getAccessToken(null, null, null, null, null);
	}

}
