package com.ateam.dao;

import org.springframework.stereotype.Repository;

import com.ateam.domain.Curriculum;

@Repository
public interface CurriculumDao extends BaseRepository<Curriculum, Integer>{

	public Curriculum findCurriculumByCurriculumName(String curriculumName);
}
