package com.revature.assignforce.domain;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "LOCATION")
public class Location {
	
	@Id
	@Column(name = "ID")
	@SequenceGenerator(allocationSize = 1, name = "locationSeq", sequenceName = "LOCATION_SEQ")
	@GeneratedValue(generator = "locationSeq", strategy = GenerationType.SEQUENCE)
	private int ID;
	
	@Column(name = "NAME", unique=true, nullable=false)
	private String name;
	
	@Column(name = "CITY")
	private String city;
	
	@Column(name = "STATE")
	private String state;
	
	@OneToMany
	@JoinColumn(name="LOCATION")
	private List<Room> rooms;
	
	public Location(){}

	public Location(int iD, String name, String city, String state, List<Room> rooms) {
		super();
		ID = iD;
		this.name = name;
		this.city = city;
		this.state = state;
		this.rooms = rooms;
	}

	public int getID() {
		return ID;
	}

	public void setID(int iD) {
		ID = iD;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public List<Room> getRooms() {
		return rooms;
	}

	public void setRooms(List<Room> rooms) {
		this.rooms = rooms;
	}

	@Override
	public String toString() {
		return "Location [ID=" + ID + ", name=" + name + ", city=" + city + ", state=" + state + ", rooms=" + rooms
				+ "]";
	}

	
	
}