package com.ateam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ateam.domain.Batch;
import com.ateam.domain.Curriculum;
import com.ateam.domain.Room;
import com.ateam.domain.Topic;
import com.ateam.domain.Trainer;

@Service
public class BatchServiceImpl implements BatchService{

	@Autowired
	DaoService dao;
	
	public List<Curriculum> getCurriculums(){
		return dao.getAllCurriculums();
	}

	@Override
	@Transactional
	public void saveBatch(Batch b) {
		
		dao.saveItem(b);
		
	}

	@Override
	public Trainer getTrainerByName(String name) {
		
		return dao.findByTrainerFirstName(name.trim());
	}

	@Override
	public Topic getTopicByName(String name) {
		return dao.findTopicByTopicName(name.trim());
	}

	@Override
	public Curriculum getCurriculumByName(String name) {
		
		return dao.findCurriculumByCurriculumName(name.trim());
	}

	@Override
	public Room getRoomByName(String name) {
		
		return dao.findRoomByRoomName(name.trim());
	}
	
	
	
	
}
