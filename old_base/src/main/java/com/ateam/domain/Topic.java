package com.ateam.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TOPIC")
public class Topic {

	@Id
	@Column(name = "TOP_ID")
	@SequenceGenerator(allocationSize = 1, name = "topicSeq", sequenceName = "TOPIC_SEQ")
	@GeneratedValue(generator = "topicSeq", strategy = GenerationType.SEQUENCE)
	private int topicID;
	
	@Column(name = "TOP_NAME", nullable=false, unique=true)
	private String topicName;

	public Topic() {
		super();
	}

	public Topic(int topicID, String topicName) {
		super();
		this.topicID = topicID;
		this.topicName = topicName;
	}

	public Topic(int topicID) {
		super();
		this.topicID = topicID;
	}

	public Topic(String topicName) {
		super();
		this.topicName = topicName;
	}

	public int getTopicID() {
		return topicID;
	}

	public void setTopicID(int topicID) {
		this.topicID = topicID;
	}

	public String getTopicName() {
		return topicName;
	}

	public void setTopicName(String topicName) {
		this.topicName = topicName;
	}

	@Override
	public String toString() {
		return "Topic [topicID=" + topicID + ", topicName=" + topicName + "]";
	}
	
	
}
