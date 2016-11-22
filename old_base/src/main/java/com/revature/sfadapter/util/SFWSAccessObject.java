package com.revature.sfadapter.util;

public class SFWSAccessObject {
	private String accessToken;
	private String refreshToken;
	private String instanceUrl;
	private String userId;
	private String issued;
	private String signature;
	
	public SFWSAccessObject(){}
	
	public SFWSAccessObject(String accessToken, String refreshToken, String instanceUrl, String userId, String issued,
			String signature) {
		super();
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.instanceUrl = instanceUrl;
		this.userId = userId;
		this.issued = issued;
		this.signature = signature;
	}
	
	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public String getInstanceUrl() {
		return instanceUrl;
	}

	public void setInstanceUrl(String instanceUrl) {
		this.instanceUrl = instanceUrl;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getIssued() {
		return issued;
	}

	public void setIssued(String issued) {
		this.issued = issued;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}
	
	
}
