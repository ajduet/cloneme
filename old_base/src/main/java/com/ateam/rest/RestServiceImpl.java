package com.ateam.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.ateam.domain.Location;
import com.ateam.domain.Room;
import com.ateam.domain.Skill;
import com.ateam.domain.Trainer;
import com.ateam.domain.Unavailable;

@Service
public class RestServiceImpl implements RestService {

	// put this on a random server application for the time being
	private static final String BASE_URL = "http://54.165.139.13:2403";
	// Zach's local
	// private static final String BASE_URL =
	// "C:/Users/Zach/Repositories/The-A-Team/AssignForce/src/main/webapp/resources/js/json";

	@Override
	public <T> List<T> getItemFromRest(T type) {
		RestTemplate restTemplate = new RestTemplate();
		URI url = null;
		// append different end to url based on input type
		String tail = checkType(type);

		try {
			url = new URI(BASE_URL + tail);
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}

		ResponseEntity<List<T>> rateResponse = restTemplate.exchange(url, HttpMethod.GET, null,
				new ParameterizedTypeReference<List<T>>() {
				});

		// puts the response in a list
		List<T> respList = rateResponse.getBody();
		respList = convertResponseToList(type, respList);

		return respList;
	}

	@SuppressWarnings("rawtypes")
	private static <T, R> List<T> convertResponseToList(T sample, List<R> respList) {
		List<T> outList = new ArrayList<T>();

		for (R r : respList) {
			outList.add(convertRespItemToType(sample, (LinkedHashMap) r));
		}

		return outList;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static <T> T convertRespItemToType(T sample, LinkedHashMap response) {
		T element = null;
		// TODO
		if ((Class<T>) sample.getClass() == Trainer.class) {
			element = (T) createTrainerFromHash(response);
		} else if ((Class<T>) sample.getClass() == Location.class) {
			element = (T) createLocationFromHash(response);
		} else if ((Class<T>) sample.getClass() == Room.class) {
			element = (T) createRoomFromHash(response);
		} else if ((Class<T>) sample.getClass() == Skill.class) {
			element = (T) createSkillFromHash(response);
		}

		return element;
	}

	@SuppressWarnings("rawtypes")
	private static Skill createSkillFromHash(LinkedHashMap response){
		String skill = (String) response.get("name");
		
		return new Skill(skill);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static Room createRoomFromHash(LinkedHashMap response) {
		String loc = (String) response.get("location");
		List<String> awayString = (List<String>) response.get("unavailableDays");
		String roomName = (String) response.get("roomName");

		return new Room(roomName, new Location(loc), createUnavailableFromString(awayString));
	}

	@SuppressWarnings("rawtypes")
	private static Location createLocationFromHash(LinkedHashMap response) {
		String loc = (String) response.get("lName");

		return new Location(loc);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static Trainer createTrainerFromHash(LinkedHashMap response) {
		String fname = (String) response.get("firstname");
		String lname = (String) response.get("lastname");
		String loc = (String) response.get("tLocation");
		List<String> awayString = (List<String>) response.get("tUnavailableDays");
		List<String> skillString = (List<String>) response.get("tSkills");

		// fname, lname, loc, List<unavail>, List<skill>
		Trainer trainer = new Trainer(fname, lname, new Location(0, loc), createUnavailableFromString(awayString),
				createSkillsFromString(skillString));
		return trainer;
	}

	private static List<Skill> createSkillsFromString(List<String> skillStrings) {
		List<Skill> skillList = new ArrayList<Skill>();

		for (String s : skillStrings) {
			skillList.add(new Skill(s));
		}

		return skillList;
	}

	private static List<Unavailable> createUnavailableFromString(List<String> dateStrings) {
		final String time = " 00:00:00";
		List<Unavailable> awayList = new ArrayList<Unavailable>();
		Unavailable uv;

		if (dateStrings == null) {
			return null;
		}

		for (String s : dateStrings) {
			String darray[] = s.split(" - ");

			Timestamp startDay = Timestamp.valueOf(darray[0] + time);
			Timestamp endDay = Timestamp.valueOf(darray[1] + time);
			uv = new Unavailable(startDay, endDay);
			awayList.add(uv);
		}

		return awayList;
	}

	@SuppressWarnings("unchecked")
	private static <T> String checkType(T type) {
		// TODO
		// need proper URLs for the test data
		if ((Class<T>) type.getClass() == Trainer.class) {
			return "/trainers";
		} else if ((Class<T>) type.getClass() == Location.class) {
			return "/locations";
		} else if ((Class<T>) type.getClass() == Room.class) {
			return "/rooms";
		} else if ((Class<T>) type.getClass() == Skill.class) {
			return "/skills";
		}

		return BASE_URL;
	}

}//end class
