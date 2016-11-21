package com.ateam.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "B_STATUS")
public class B_Status {

	@Id
	@Column(name = "BS_ID")
	@SequenceGenerator(allocationSize = 1, name = "bsSeq", sequenceName = "BS_SEQ")
	@GeneratedValue(generator = "bsSeq", strategy = GenerationType.SEQUENCE)
	private int bStatusID;
	
	@Column(name = "BS_NAME", unique=true, nullable=false)
	private String bsName;

	public B_Status() {
		super();
	}

	public B_Status(int bStatusID, String bsName) {
		super();
		this.bStatusID = bStatusID;
		this.bsName = bsName;
	}

	public B_Status(int bStatusID) {
		super();
		this.bStatusID = bStatusID;
	}

	public int getbStatusID() {
		return bStatusID;
	}

	public void setbStatusID(int bStatusID) {
		this.bStatusID = bStatusID;
	}

	public String getbName() {
		return bsName;
	}

	public void setbName(String bName) {
		this.bsName = bName;
	}

	@Override
	public String toString() {
		return "B_Status [bStatusID=" + bStatusID + ", bName=" + bsName + "]";
	}
	
}
