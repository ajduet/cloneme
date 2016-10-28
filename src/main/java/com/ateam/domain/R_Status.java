package com.ateam.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "R_STATUS")
public class R_Status {

	@Id
	@Column(name = "RS_ID")
	@SequenceGenerator(allocationSize = 1, name = "rsSeq", sequenceName = "RS_SEQ")
	@GeneratedValue(generator = "rsSeq", strategy = GenerationType.SEQUENCE)
	private int rsStatusID;
	
	@Column(name = "RS_NAME", unique=true, nullable=false)
	private String rsName;

	public R_Status() {
		super();
	}

	public R_Status(int rsStatusID, String rsName) {
		super();
		this.rsStatusID = rsStatusID;
		this.rsName = rsName;
	}

	public int getRsStatusID() {
		return rsStatusID;
	}

	public void setRsStatusID(int rsStatusID) {
		this.rsStatusID = rsStatusID;
	}

	public String getRsName() {
		return rsName;
	}

	public void setRsName(String rsName) {
		this.rsName = rsName;
	}

	@Override
	public String toString() {
		return "R_Status [rsStatusID=" + rsStatusID + ", rsName=" + rsName + "]";
	}
	
}
