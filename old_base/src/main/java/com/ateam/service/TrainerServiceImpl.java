package com.ateam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ateam.domain.Trainer;

@Service
public class TrainerServiceImpl implements TrainerService{

	@Autowired
	DaoService dao;
	
	public List<Trainer> getTrainers() {
		List<Trainer> trainers = dao.getAllItem(new Trainer());
		return trainers;
	}

	public void saveTrainer(Trainer t) {
		dao.saveItem(t);
	}

}
