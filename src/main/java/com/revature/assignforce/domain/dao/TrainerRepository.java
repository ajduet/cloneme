package com.revature.assignforce.domain.dao;

import org.springframework.stereotype.Repository;

import com.revature.assignforce.domain.Trainer;

@Repository
public interface TrainerRepository extends BaseRepository<Trainer, Integer> {
	public Trainer findByFirstName(String name);
}
