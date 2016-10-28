package com.ateam.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "TRAINER")
public class Trainer {

	@Id
	@Column(name = "T_ID")
	@SequenceGenerator(allocationSize = 1, name = "trainerSeq", sequenceName = "TRAINER_SEQ")
	@GeneratedValue(generator = "trainerSeq", strategy = GenerationType.SEQUENCE)
	private int trainerID;

	@Column(name = "T_FIRSTNAME", nullable = false)
	private String trainerFirstName;

	public Trainer(int trainerID) {
		super();
		this.trainerID = trainerID;
	}

	public Trainer(String trainerFirstName) {
		super();
		this.trainerFirstName = trainerFirstName;
	}

	@Column(name = "T_LASTNAME", nullable = false)
	private String trainerLastName;

	// @ManyToOne(fetch=FetchType.LAZY)
	// @ManyToOne(fetch=FetchType.EAGER)
	@ManyToOne
	@JoinColumn(name = "TS_ID")
	@Fetch(FetchMode.JOIN)
	private T_Status trainerStatusID;

	// @OneToOne(fetch=FetchType.LAZY)
	// @OneToOne(fetch=FetchType.EAGER)
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name = "L_ID")
	//@OneToOne
	//@JoinColumn(name = "L_ID")
	//@Fetch(FetchMode.JOIN)
	private Location trainerLocationID;

//	@ManyToMany(mappedBy="trainer", cascade=CascadeType.ALL, fetch=FetchType.EAGER)
//	@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")						// ADDED this to fix serialization/infinite loop issues
	@ManyToMany(fetch=FetchType.EAGER)
	@JoinTable(name="TR_UN_JT", 
	joinColumns=@JoinColumn(name="T_ID"), 
	inverseJoinColumns=@JoinColumn(name="UN_ID"))
	private List<Unavailable> unavailable;

	//@ManyToMany(mappedBy="trainer", cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@ManyToMany(cascade = CascadeType.ALL, fetch=FetchType.EAGER)
	@JoinTable(name="TR_SKILL_JT",
    joinColumns=@JoinColumn(name="T_ID"),
    inverseJoinColumns=@JoinColumn(name="SKILL_ID"))
	@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")						// ADDED this to fix serialization/infinite loop issues
	private List<Skill> skill;

	public Trainer() {
		super();
		this.unavailable = new ArrayList<Unavailable>();
		this.skill = new ArrayList<Skill>();
	}

	public Trainer(int trainerID, String trainerFirstName, String trainerLastName, T_Status trainerStatusID,
			Location trainerLocationID) {
		super();
		this.trainerID = trainerID;
		this.trainerFirstName = trainerFirstName;
		this.trainerLastName = trainerLastName;
		this.trainerStatusID = trainerStatusID;
		this.trainerLocationID = trainerLocationID;
	}

	public Trainer(String trainerFirstName, String trainerLastName, Location trainerLocation,
			List<Unavailable> unavailableDates, List<Skill> skills) {
		this();
		this.trainerFirstName = trainerFirstName;
		this.trainerLastName = trainerLastName;
		this.trainerLocationID = trainerLocation;
		this.unavailable = unavailableDates;
		this.skill = skills;
	}

	public Trainer(int trainerID, String trainerFirstName, String trainerLastName, T_Status trainerStatusID,
			Location trainerLocationID, List<Unavailable> unavailable, List<Skill> skill) {
		super();
		this.trainerID = trainerID;
		this.trainerFirstName = trainerFirstName;
		this.trainerLastName = trainerLastName;
		this.trainerStatusID = trainerStatusID;
		this.trainerLocationID = trainerLocationID;
		this.unavailable = unavailable;
		this.skill = skill;
	}

	public int getTrainerID() {
		return trainerID;
	}

	public void setTrainerID(int trainerID) {
		this.trainerID = trainerID;
	}

	public String getTrainerFirstName() {
		return trainerFirstName;
	}

	public void setTrainerFirstName(String trainerFirstName) {
		this.trainerFirstName = trainerFirstName;
	}

	public String getTrainerLastName() {
		return trainerLastName;
	}

	public void setTrainerLastName(String trainerLastName) {
		this.trainerLastName = trainerLastName;
	}

	public T_Status getTrainerStatusID() {
		return trainerStatusID;
	}

	public void setTrainerStatusID(T_Status trainerStatusID) {
		this.trainerStatusID = trainerStatusID;
	}

	public Location getTrainerLocationID() {
		return trainerLocationID;
	}

	public void setTrainerLocationID(Location trainerLocationID) {
		this.trainerLocationID = trainerLocationID;
	}

	public List<Unavailable> getUnavailable() {
		return unavailable;
	}

	public void setUnavailable(List<Unavailable> unavailable) {
		this.unavailable = unavailable;
	}

	public List<Skill> getSkill() {
		return skill;
	}

	public void setSkill(List<Skill> skill) {
		this.skill = skill;
	}

	@Override
	public String toString() {
		return "Trainer [trainerID=" + trainerID + ", trainerFirstName=" + trainerFirstName + ", trainerLastName="
				+ trainerLastName + ", trainerStatusID=" + trainerStatusID + ", trainerLocationID=" + trainerLocationID
				+ ", unavailable=" + unavailable + ", skill=" + skill + "]";
	}
	
}
