package com.ateam.dao;

import org.springframework.stereotype.Repository;

import com.ateam.domain.Trainer;

@Repository
public interface TrainerDao extends BaseRepository<Trainer, Integer>{
	public Trainer findByTrainerID(int trainerID);
	
	public Trainer findByTrainerFirstName(String trainerFirstName);
}
