package com.ateam.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "LOCATION")
public class Location {
	
	@Id
	@Column(name = "L_ID")
	@SequenceGenerator(allocationSize = 1, name = "locationSeq", sequenceName = "LOCATION_SEQ")
	@GeneratedValue(generator = "locationSeq", strategy = GenerationType.SEQUENCE)
	private int locationID;
	
	@Column(name = "L_NAME", unique=true, nullable=false)
	private String locationName;

	@Column(name = "L_CITY")
	private String locationCity;
	
	@Column(name = "L_STATE")
	private String locationState;

	@OneToMany(mappedBy="roomLocationID")
	private List<Room> rooms;

	public Location() {
		super();
	}
	
	public Location(int locationID, String locationName) {
		super();
		this.locationID = locationID;
		this.locationName = locationName;
	}
	
	public String getLocationCity() {
		return locationCity;
	}

	public void setLocationCity(String locationCity) {
		this.locationCity = locationCity;
	}

	public String getLocationState() {
		return locationState;
	}

	public void setLocationState(String locationState) {
		this.locationState = locationState;
	}

	public Location(String locationName) {
		super();
		this.locationName = locationName;
	}

	public int getLocationID() {
		return locationID;
	}

	public void setLocationID(int locationID) {
		this.locationID = locationID;
	}

	public String getLocationName() {
		return locationName;
	}

	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}

	@Override
	public String toString() {
		return "Location [locationID=" + locationID + ", locationName=" + locationName + ", locationCity="
				+ locationCity + ", locationState=" + locationState + "]";
	}

	public List<Room> getRooms() {
		return rooms;
	}

	public void setRooms(List<Room> rooms) {
		this.rooms = rooms;
	}

	
	
}
