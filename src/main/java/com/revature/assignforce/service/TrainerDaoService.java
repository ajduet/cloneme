package com.revature.assignforce.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revature.assignforce.domain.Trainer;
import com.revature.assignforce.domain.dao.TrainerRepository;

@Transactional
@Service
public class TrainerDaoService extends DaoService<Trainer, Integer>{
	
	public Trainer findByFiristName(String name){
		return ((TrainerRepository) repo).findByFirstName(name);
	}

}
