package com.revature.sfadapter.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.revature.sfadapter.contract.SFWebserverWorkflow;

@Service
public class SFWSAccessor implements SFWebserverWorkflow {

	/**
	 * @author August Duet This method is used to build a url to the
	 *         login.salesforce.com authorization service
	 * @param clientId
	 *            -- the consumer key provided by salesforce for accessing your
	 *            instance
	 * @param callback
	 *            -- the redirect uri that salesforce will send its response
	 *            back to.
	 * @param optionalParams
	 *            -- key/value pairs for optional parameters to be sent to
	 *            salesforce refer to salesforce documentation for those options
	 * @throws IllegalArgumentException
	 *             -- clientId and callback are required for proper interaction
	 *             so passing null in either of these parameters will result in
	 *             an IllegalArgumentException
	 */
	@Override
	public String getAuthorizationUrl(String clientId, String callback, Map<String, String> optionalParams) {

		String urlBase = "https://login.salesforce.com/services/oauth2/authorize?response_type=code&";

		// check for null values
		if (clientId == null || callback == null) {
			throw new IllegalArgumentException(
					"clientId and callback are required, ensure that neither one has a value of null");
		}

		// ecnode the passed url
		String encodedUrl = null;
		try {
			encodedUrl = URLEncoder.encode(callback, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			encodedUrl = URLEncoder.encode(callback);
		}

		urlBase += "client_id=" + clientId + "&redirect_uri=" + encodedUrl;

		if (optionalParams != null) {
			for (Entry<String, String> e : optionalParams.entrySet()) {
				urlBase += "&" + e.getKey() + "=" + e.getValue();
			}
		}

		return urlBase;
	}

	/**
	 * @author August Duet This method is used to return the access data for a
	 *         user after obtaining an auth code
	 * @param clientId
	 *            -- the consumer key provided by salesforce for accessing your
	 *            instance
	 * @param callback
	 *            -- the redirect uri that salesforce will send its response
	 *            back to.
	 * @param authCode
	 *            -- the code that was given to you from the user logging into
	 *            salesforce
	 * 
	 * @param optionalParams
	 *            -- key/value pairs for optional parameters to be sent to
	 *            salesforce refer to salesforce documentation for those options
	 * 
	 * @throws IllegalArgumentException
	 *             -- clientId, clientSecret, callback, and authCode are
	 *             required for proper interaction so passing null in either of
	 *             these parameters will result in an IllegalArgumentException
	 */
	@Override
	public SFWSAccessObject getAccessToken(String clientId, String clientSecret, String callback, String authCode,
			Map<String, String> optionalParams) {
		
		if(clientId == null || clientSecret == null || callback == null || authCode == null){
			throw new IllegalArgumentException("clientId, clientSecret, callback, and authcode are all required, ensure that neither one has a value of null");
		}
		
		RestTemplate client = new RestTemplate();
		final String url = "https://login.salesforce.com/services/oauth2/token";
		String encodedUrl = null;
		try {
			encodedUrl = URLEncoder.encode(callback,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			encodedUrl = URLEncoder.encode(callback);
		}
		
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.set("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE);
		params.set("Accept", "application/json");
		
		MultiValueMap<String, String> data = new LinkedMultiValueMap<>();
		data.set("grant_type", "authorization_code");
		data.set("code", authCode);
		data.set("redirect_uri", encodedUrl);
		data.set("client_secret", clientSecret);
		data.set("client_id", clientId);
		
		if(optionalParams != null){
			data.setAll(optionalParams);
		}
		
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(data, params);
		ResponseEntity<SFWSAccessObject> response = client.exchange(url, HttpMethod.POST, requestEntity, SFWSAccessObject.class);
		return response.getBody();
	}

}
