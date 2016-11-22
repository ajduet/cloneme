package com.revature.dto;

import java.sql.Date;

public class BatchDTO {

	private int batchId;
	private String batchName;
	private String topic;
	private String curr;
	private String trainer;
	private String room;
	private Date date;
	private Date date2;

	public int getBatchId() {
		return batchId;
	}
	public void setBatchId(String batchId) {
		this.batchId = Integer.parseInt(batchId);
	}
	public String getBatchName() {
		return batchName;
	}
	public void setBatchName(String batchName) {
		this.batchName = batchName;
	}
	public String getTopic() {
		return topic;
	}
	public void setTopic(String topic) {
		this.topic = topic;
	}
	public String getCurr() {
		return curr;
	}
	public void setCurr(String curr) {
		this.curr = curr;
	}
	public String getTrainer() {
		return trainer;
	}
	public void setTrainer(String trainer) {
		this.trainer = trainer;
	}
	public String getRoom() {
		return room;
	}
	public void setRoom(String room) {
		this.room = room;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Date getDate2() {
		return date2;
	}
	public void setDate2(Date date2) {
		this.date2 = date2;
	}
	@Override
	public String toString() {
		return "BatchDTO [batchName=" + batchName + ", topic=" + topic + ", curr=" + curr + ", trainer=" + trainer
				+ ", room=" + room + ", date=" + date + ", date2=" + date2 + "]";
	}
	
	
	
	
	
	
	
}
