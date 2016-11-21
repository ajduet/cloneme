package com.ateam.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ateam.domain.Location;
import com.ateam.domain.Room;
import com.ateam.domain.Skill;
import com.ateam.domain.Trainer;
import com.ateam.domain.Unavailable;
import com.ateam.rest.RestService;

@Service
public class InitServiceImpl implements InitService {
	@Autowired
	private RestService rest;

	@Autowired
	private DaoService dao = new DaoServiceImpl();
	// autowiring isnt working... ^ this should not be needed

	public void initSetup() {
		// TODO
		// grab data from BB
		// trainer, unavailable, skill, room, location
		List<Location> locationList_BB = rest.getItemFromRest(new Location());
		List<Trainer> trainerList_BB = rest.getItemFromRest(new Trainer());
		List<Room> roomList_BB = rest.getItemFromRest(new Room());
		List<Skill> skillList_BB = rest.getItemFromRest(new Skill());
		List<Unavailable> unavailableList_BB = createUnavailableList(trainerList_BB, roomList_BB);
		// END grab data REST

		System.out.println("init makes it");

		// grab data from DB
		List<Location> locationList_DB = dao.getAllItem(new Location());
		List<Unavailable> unavailableList_DB = dao.getAllItem(new Unavailable());
		List<Trainer> trainerList_DB = dao.getAllItem(new Trainer());
		List<Skill> skillList_DB = dao.getAllItem(new Skill());
		// List<Room> roomList_DB = dao.getAllItem(new Room());
		System.out.println("trainerList_DB: " + trainerList_DB);
		// END GRAB DATA FROM DB

		// Compare data from BB to data from DB

		if (!isSame(locationList_BB, locationList_DB)) {
			// update the db for location
			List<Location> elemList = getDifferences(locationList_BB, locationList_DB);
			for (Location loc : elemList) {
				dao.saveItem(loc);
			} // save all to db
		}

		if (!isSame(skillList_BB, skillList_DB)) {
			// update the db for skill
			List<Skill> elemList = getDifferences(skillList_BB, skillList_DB);
			for (Skill sk : elemList) {
				dao.saveItem(sk);
			} // save all to db
		}

		if (!isSame(unavailableList_BB, unavailableList_DB)) {
			// update the db for unavailable
			List<Unavailable> elemList = getDifferences(unavailableList_BB, unavailableList_DB);
			for (Unavailable uv : elemList) {
				dao.saveItem(uv);
			} // save all to db
		}

		if (!isSame(trainerList_BB, trainerList_DB)) {
			// update the db for trainer
			List<Trainer> elemList = getDifferences(trainerList_BB, trainerList_DB);
			for (Trainer trainer : elemList) {
				dao.saveItem(trainer);
			} // save all to db }
		}

/*
		  if(!isSame(roomList_BB, roomList_DB)){
		  //update the db for room
		  List<Room> elemList = getDifferences(roomList_BB, roomList_DB); 
		  for(Room room : elemList) { dao.saveItem(room); 
		  }//save all to db
		  
		  }
*/

		// if anything has changed, update DB

	}// end initSetup()

	private List<Unavailable> createUnavailableList(List<Trainer> trainers, List<Room> rooms) {
		List<Unavailable> away = new ArrayList<Unavailable>();

		if (!trainers.isEmpty()) {
			for (Trainer t : trainers) {
				if (t != null) {
					if (t.getUnavailable() != null) {
						away.addAll(t.getUnavailable());
					}
				}
			}
		}
		if (!rooms.isEmpty()) {
			for (Room r : rooms) {
				if (r != null) {
					if (r.getUnavailable() != null) {
						away.addAll(r.getUnavailable());
					}
				}
			}
		}

		return away;
	}

	private <T> List<T> getDifferences(List<T> a, List<T> b) {
		List<T> elemList = new ArrayList<T>();
		int flag = 0;

		for (T ta : a) {
			for (T tb : b) {
				if (ta.equals(tb)) {
					flag = 1;
					break;
				}
			}
			if (flag == 0) {
				elemList.add(ta);
				flag = 0;
			}
		}

		return elemList;
	}// end getDifferences

	private <T> boolean isSame(List<T> a, List<T> b) {
		if (a.containsAll(b) && !b.isEmpty()) {
			return true;
		}
		return false;
	}// end isSame()

}
