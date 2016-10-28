package com.ateam.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "T_STATUS")
public class T_Status {

	@Id
	@Column(name = "TS_ID")
	@SequenceGenerator(allocationSize = 1, name = "tsSeq", sequenceName = "TS_SEQ")
	@GeneratedValue(generator = "tsSeq", strategy = GenerationType.SEQUENCE)
	private int tStatusID;
	
	@Column(name = "TS_NAME", unique=true, nullable=false)
	private String tsName;

	public T_Status() {
		super();
	}

	public T_Status(int tStatusID, String tsName) {
		super();
		this.tStatusID = tStatusID;
		this.tsName = tsName;
	}

	public int gettStatusID() {
		return tStatusID;
	}

	public void settStatusID(int tStatusID) {
		this.tStatusID = tStatusID;
	}

	public String gettName() {
		return tsName;
	}

	public void settName(String tsName) {
		this.tsName = tsName;
	}

	@Override
	public String toString() {
		return "T_Status [tStatusID=" + tStatusID + ", tName=" + tsName + "]";
	}
}
