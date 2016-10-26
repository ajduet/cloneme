package com.ateam.service;

import java.util.List;

import com.ateam.domain.Batch;
import com.ateam.domain.Curriculum;
import com.ateam.domain.Room;
import com.ateam.domain.Topic;
import com.ateam.domain.Trainer;

public interface DaoService{

	public <T> void delete(T sample);
	
	//TODO?
	public <T> List<T> getAllItem(T Sample);
	
	//TODO?
//	public <T> Optional<T> findOne(ID id);
	
	public <T> T saveItem(T persisted);
	
	public Trainer findTrainerById(int id);
	public List<Trainer> findAllTrainers();

	public List<Batch> findAllBatches();
	public Batch findByBatchID(int BatchID);
	
	public List<Room> getAllRooms();
	
	public List<Curriculum> getAllCurriculums();
	
	public Trainer findByTrainerFirstName(String trainerFirstName);
	
	public Room findRoomByRoomName(String roomName);
	
	public Curriculum findCurriculumByCurriculumName(String curriculumName);
	
	public Topic findTopicByTopicName(String topicName);
	
	public List<Batch> findAllBatchStartDate();

}
