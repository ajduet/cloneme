package com.ateam.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ateam.domain.Batch;

@Repository
public interface BatchDao extends BaseRepository<Batch, Integer>{
	public Batch findByBatchID(int BatchID);
	public List<Batch> findAllByOrderByBatchStartDateDesc();

}
