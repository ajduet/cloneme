package com.ateam.controllers;

import java.sql.Timestamp;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ateam.domain.B_Status;
import com.ateam.domain.Batch;
import com.ateam.domain.Curriculum;
import com.ateam.domain.Room;
import com.ateam.domain.Topic;
import com.ateam.domain.Trainer;
import com.ateam.service.BatchService;
import com.ateam.service.DaoService;
import com.revature.dto.BatchDTO;
import com.revature.sfadapter.util.SFWSAccessor;


@RestController
public class BatchCtrl {


	@Autowired
	DaoService daoService;
	
	@Autowired
	BatchService bServ;

	@RequestMapping(value = { "/curriculum"}, 
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Curriculum>> getCurriculums() {
		List<Curriculum> re = daoService.getAllItem(new Curriculum());

		return new ResponseEntity<List<Curriculum>>(re, HttpStatus.OK);
	}//end getCurriculums()

	@RequestMapping(value = { "/trainer"}, 
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Trainer>> getTrainers() {

		List<Trainer> re = daoService.findAllTrainers();
System.out.println(re);
		return new ResponseEntity<List<Trainer>>(re, HttpStatus.OK);
	}//end getTrainers()

	@RequestMapping(value = { "/batches"}, 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Batch>> getBatches() {
//		List<Batch> re = daoService.findAllBatches();
		List<Batch> re = daoService.findAllBatchStartDate();

		return new ResponseEntity<List<Batch>>(re, HttpStatus.OK);
	}//end getTrainers()
	
	//Get Topics
	@RequestMapping(value = { "/topics"}, 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Topic>> getTopics() {
		List<Topic> topics = daoService.getAllItem(new Topic());

		return new ResponseEntity<List<Topic>>(topics, HttpStatus.OK);
	}
	
	//Get Rooms
		@RequestMapping(value = { "/rooms"}, 
				method = RequestMethod.GET, 
				produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<List<Room>> getRooms() {
			List<Room> rooms = daoService.getAllItem(new Room());

			System.out.println(rooms);
			return new ResponseEntity<List<Room>>(rooms, HttpStatus.OK);
		}
	
		//Save batch
		@RequestMapping(value = { "/savebatch"}, 
				method = RequestMethod.POST, 
				consumes = MediaType.APPLICATION_JSON_VALUE,
				produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<Batch> saveBatch(@RequestBody BatchDTO batchObj) throws InterruptedException{
			
			  // Trainer
			Trainer t;
			if (batchObj.getTrainer() == null) {
				t = new Trainer();
			} else {
				t = bServ.getTrainerByName(batchObj.getTrainer());
			}
			System.out.println(t.toString());
			
			  // Room
			Room room;
			if (batchObj.getRoom() == null) {
				room = new Room();
			} else {
				room = bServ.getRoomByName(batchObj.getRoom());
			}
			System.out.println(room);
			
			  // Curriculum
			Curriculum c;
			if (batchObj.getCurr() == null) {
				c = new Curriculum();
			} else {
				c = bServ.getCurriculumByName(batchObj.getCurr());
			}
			System.out.println(c);
			
			  // Start date
			Timestamp start;
			if (batchObj.getDate() == null) {
				start = new Timestamp((long)0);
			} else {
				start = new Timestamp(batchObj.getDate().getTime());
			}
			
			  // End date
			Timestamp end;
			if (batchObj.getDate2() == null) {
				end = new Timestamp((long)0);
			} else {
				end = new Timestamp(batchObj.getDate2().getTime());
			}
			
			Batch b = new Batch(batchObj.getBatchName(), start, end, c, room, new B_Status(1), t);
			b.setBatchID(batchObj.getBatchId());
			
			System.out.println("-------------------------------");
			System.out.println(batchObj.getBatchId());
			System.out.println(b.toString());
			System.out.println("-------------------------------");
			
			bServ.saveBatch(b);
			
		return new ResponseEntity<Batch>(b, HttpStatus.OK);
//			return null;
		}
	
	@RequestMapping(value = { "/getbatch"}, 
			method = RequestMethod.GET, 
//			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Batch> getBatchById(@RequestParam("bId") String bId) throws InterruptedException{
		System.out.println("getBatchById Ctrl: "+bId);
		System.out.println("---------------------------------------------------------------");
		Batch batch = daoService.findByBatchID(Integer.parseInt(bId));

		try {
			TimeUnit.SECONDS.sleep(2);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		
//		System.out.println(batch);
		return new ResponseEntity<Batch>(batch, HttpStatus.OK);

	}
	
}
