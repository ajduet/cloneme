package com.revature.assignforce.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "ROOM")
public class Room {
	
	@Id
	@Column(name = "ID")
	@SequenceGenerator(allocationSize = 1, name = "roomSeq", sequenceName = "ROOM_SEQ")
	@GeneratedValue(generator = "roomSeq", strategy = GenerationType.SEQUENCE)
	private int roomID;
	
	@Column(name = "NAME", unique = true, nullable = false)
	private String roomName;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "ROOM_UNAVAILABILITY_JT", joinColumns = @JoinColumn(name = "ROOM_ID"), inverseJoinColumns = @JoinColumn(name = "UNAVAILABLE_ID"))
	@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id") 
	private List<Unavailable> unavailable;
	
	public Room(){}
	
	public Room(int roomID, String roomName, List<Unavailable> unavailable) {
		super();
		this.roomID = roomID;
		this.roomName = roomName;
		this.unavailable = unavailable;
	}

	public int getRoomID() {
		return roomID;
	}

	public void setRoomID(int roomID) {
		this.roomID = roomID;
	}

	public String getRoomName() {
		return roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public List<Unavailable> getUnavailable() {
		return unavailable;
	}

	public void setUnavailable(List<Unavailable> unavailable) {
		this.unavailable = unavailable;
	}

	@Override
	public String toString() {
		return "Room [roomID=" + roomID + ", roomName=" + roomName + ", unavailable=" + unavailable + "]";
	}

}