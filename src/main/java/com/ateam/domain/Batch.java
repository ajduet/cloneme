package com.ateam.domain;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
@Table(name = "BATCH")
public class Batch {

	@Id
	@Column(name = "B_ID")
	@SequenceGenerator(allocationSize = 1, name = "batchSeq", sequenceName = "BATCH_SEQ")
	@GeneratedValue(generator = "batchSeq", strategy = GenerationType.SEQUENCE)
	private int batchID;
	
	@Column(name="B_NAME")
	private String bName;

	@Column(name = "B_START_DATE", nullable=false)
	private Timestamp batchStartDate;

	@Column(name = "B_END_DATE", nullable=false)
	private Timestamp batchEndDate;

	//@ManyToOne(fetch=FetchType.LAZY)
	//@ManyToOne(fetch=FetchType.EAGER)
	@ManyToOne
	@JoinColumn(name = "TOP_ID")
	@Fetch(FetchMode.JOIN)
	private Topic batchTopicID;

	//@ManyToOne(fetch=FetchType.LAZY)
	//@ManyToOne(fetch=FetchType.EAGER)
	@ManyToOne
	@JoinColumn(name = "CUR_ID")
	@Fetch(FetchMode.JOIN)
	private Curriculum batchCurriculumID;
	
	//@OneToOne(fetch=FetchType.LAZY)
	//@OneToOne(fetch=FetchType.EAGER)
	@OneToOne
	@JoinColumn(name = "R_ID")
	@Fetch(FetchMode.JOIN)
	private Room batchRoomID;
	
	//@ManyToOne(fetch=FetchType.LAZY)
	//@ManyToOne(fetch=FetchType.EAGER)
	@ManyToOne
	@JoinColumn(name = "BS_ID")
	@Fetch(FetchMode.JOIN)
	private B_Status batchStatusID;
	
	//@ManyToOne(fetch=FetchType.LAZY)
	//@ManyToOne(fetch=FetchType.EAGER)
	@OneToOne
	@JoinColumn(name = "T_ID")
	@Fetch(FetchMode.JOIN)
	private Trainer batchTrainerID;

	public Batch() {
		super();
	}

	public Batch(int batchID, Timestamp batchStartDate, Timestamp batchEndDate, Topic batchTopicID, Curriculum batchCurriculumID,
			Room batchRoomID, B_Status batchStatusID, Trainer batchTrainerID) {
		super();
		this.batchID = batchID;
		this.batchStartDate = batchStartDate;
		this.batchEndDate = batchEndDate;
		this.batchTopicID = batchTopicID;
		this.batchCurriculumID = batchCurriculumID;
		this.batchRoomID = batchRoomID;
		this.batchStatusID = batchStatusID;
		this.batchTrainerID = batchTrainerID;
	}
	
	public Batch(int batchId, String batchName/*, Curriculum curr, Date date, Date date2, Room room, Topic topic, Trainer trainer*/){
		super();
		System.out.println("batch init i think");
	}
	
	
	public Batch(String bName, Timestamp batchStartDate, Timestamp batchEndDate, Topic batchTopicID,
			Curriculum batchCurriculumID, Room batchRoomID, B_Status batchStatusID, Trainer batchTrainerID) {
		super();
		this.bName = bName;
		this.batchStartDate = batchStartDate;
		this.batchEndDate = batchEndDate;
		this.batchTopicID = batchTopicID;
		this.batchCurriculumID = batchCurriculumID;
		this.batchRoomID = batchRoomID;
		this.batchStatusID = batchStatusID;
		this.batchTrainerID = batchTrainerID;
	}

	public int getBatchID() {
		return batchID;
	}

	public void setBatchID(int batchID) {
		this.batchID = batchID;
	}

	public Timestamp getBatchStartDate() {
		return batchStartDate;
	}

	public void setBatchStartDate(Timestamp batchStartDate) {
		this.batchStartDate = batchStartDate;
	}

	public Timestamp getBatchEndDate() {
		return batchEndDate;
	}

	public void setBatchEndDate(Timestamp batchEndDate) {
		this.batchEndDate = batchEndDate;
	}

	public Topic getBatchTopicID() {
		return batchTopicID;
	}

	public void setBatchTopicID(Topic batchTopicID) {
		this.batchTopicID = batchTopicID;
	}

	public Curriculum getBatchCurriculumID() {
		return batchCurriculumID;
	}

	public void setBatchCurriculumID(Curriculum batchCurriculumID) {
		this.batchCurriculumID = batchCurriculumID;
	}

	public Room getBatchRoomID() {
		return batchRoomID;
	}

	public void setBatchRoomID(Room batchRoomID) {
		this.batchRoomID = batchRoomID;
	}

	public B_Status getBatchStatusID() {
		return batchStatusID;
	}

	public void setBatchStatusID(B_Status batchStatusID) {
		this.batchStatusID = batchStatusID;
	}

	public Trainer getBatchTrainerID() {
		return batchTrainerID;
	}

	public void setBatchTrainerID(Trainer batchTrainerID) {
		this.batchTrainerID = batchTrainerID;
	}

	public String getbName() {
		return bName;
	}

	public void setbName(String bName) {
		this.bName = bName;
	}

	@Override
	public String toString() {
		return "Batch [batchID=" + batchID + ", bName=" + bName + ", batchStartDate=" + batchStartDate
				+ ", batchEndDate=" + batchEndDate + ", batchTopicID=" + batchTopicID + ", batchCurriculumID="
				+ batchCurriculumID + ", batchRoomID=" + batchRoomID + ", batchStatusID=" + batchStatusID
				+ ", batchTrainerID=" + batchTrainerID + "]";
	}

	

}
