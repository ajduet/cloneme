package com.ateam.rest;

import java.util.List;

public interface RestService {

	
	public  <T> List<T> getItemFromRest(T type);

}
