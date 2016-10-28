package com.ateam.dao;


import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.Repository;

@NoRepositoryBean
interface BaseRepository<T, ID extends Serializable> extends Repository<T, ID> {
	
	public void delete(T deleted);
	 
    public List<T> findAll();
     
    public Optional<T> findOne(ID id);
 
    public T save(T persisted);

}
