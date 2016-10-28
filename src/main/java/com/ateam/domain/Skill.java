package com.ateam.domain;

import java.util.ArrayList;
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

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "SKILL")
public class Skill {

	@Id
	@Column(name = "SKILL_ID")
	@SequenceGenerator(allocationSize = 1, name = "skillSeq", sequenceName = "SKILL_SEQ")
	@GeneratedValue(generator = "skillSeq", strategy = GenerationType.SEQUENCE)
	private int skillID;
	
	@Column(name = "SKILL_NAME", unique=true, nullable=false)
	private String skillName;
	
/*	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(name="CUR_SKILL_JT", 
	joinColumns=@JoinColumn(name="SKILL_ID"), 
	inverseJoinColumns=@JoinColumn(name="CUR_ID"))
	@JsonBackReference
	private List<Curriculum> curriculum;
*/	
//	@ManyToMany(fetch=FetchType.LAZY)
//	@JoinTable(name="TR_SKILL_JT", 
//	joinColumns=@JoinColumn(name="SKILL_ID"), 
//	inverseJoinColumns=@JoinColumn(name="T_ID"))
//	@JsonBackReference
//	private List<Trainer> trainer;

	public Skill() {
		super();
//		this.curriculum = new ArrayList<Curriculum>();
//		this.trainer = new ArrayList<Trainer>();
	}

	public Skill(int skillID, String skillName) {
		super();
		this.skillID = skillID;
		this.skillName = skillName;
	}

	public Skill(String skillName) {
		this();
		this.skillName = skillName;
	}

	public Skill(int skillID, String skillName, List<Curriculum> curriculum, List<Trainer> trainer) {
		super();
		this.skillID = skillID;
		this.skillName = skillName;
//		this.curriculum = curriculum;
//		this.trainer = trainer;
	}

	public int getSkillID() {
		return skillID;
	}

	public void setSkillID(int skillID) {
		this.skillID = skillID;
	}

	public String getSkillName() {
		return skillName;
	}

	public void setSkillName(String skillName) {
		this.skillName = skillName;
	}
/*
	public List<Curriculum> getCurriculum() {
		return curriculum;
	}

	public void setCurriculum(List<Curriculum> curriculum) {
		this.curriculum = curriculum;
	}

*/	@Override
	public String toString() {
		return "Skill [skillID=" + skillID + ", skillName=" + skillName + "]";
	}

//	public List<Trainer> getTrainer() {
//		return trainer;
//	}
//
//	public void setTrainer(List<Trainer> trainer) {
//		this.trainer = trainer;
//	}

	
	
}
