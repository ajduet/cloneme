package com.ateam.service;

import java.util.List;

import com.ateam.domain.Batch;
import com.ateam.domain.Curriculum;
import com.ateam.domain.Room;
import com.ateam.domain.Topic;
import com.ateam.domain.Trainer;

public interface BatchService {

	public List<Curriculum> getCurriculums();
	
	public void saveBatch(Batch b);
	
	public Trainer getTrainerByName(String name);
	
	public Topic getTopicByName(String name);
	
	public Curriculum getCurriculumByName(String name);
	
	public Room getRoomByName(String name);
}
