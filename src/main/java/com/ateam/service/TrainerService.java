package com.ateam.service;

import java.util.List;

import com.ateam.domain.Trainer;


public interface TrainerService {

	List<Trainer> getTrainers();
	public void saveTrainer(Trainer t);
}
