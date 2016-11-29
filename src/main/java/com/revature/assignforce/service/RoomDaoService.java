package com.revature.assignforce.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revature.assignforce.domain.Room;

@Transactional
@Service
public class RoomDaoService extends DaoService<Room, Integer> {

    @Override
    public void deleteItem(Integer integer) {

        //get my batch
        //set the room id to null
        super.deleteItem(integer);
    }
}
