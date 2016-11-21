package com.ateam.domain;

import java.sql.Timestamp;
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

@Entity
@Table(name = "UNAVAILABLE")
public class Unavailable {

	

	@Id
	@Column(name = "UN_ID")
	@SequenceGenerator(allocationSize = 1, name = "unavailableSeq", sequenceName = "UNAVAILABLE_SEQ")
	@GeneratedValue(generator = "unavailableSeq", strategy = GenerationType.SEQUENCE)
	private int unavailableID;

	

	@Column(name = "UN_START_DATE", nullable=false)
	private Timestamp unavailableStartDate;



	@Column(name = "UN_END_DATE", nullable=false)
	private Timestamp unavailableEndDate;

	


//	@ManyToMany(fetch=FetchType.EAGER)

//	@JoinTable(name="TR_UN_JT", 

//	joinColumns=@JoinColumn(name="UN_ID"), 

//	inverseJoinColumns=@JoinColumn(name="T_ID"))

//	private List<Trainer> trainer;

	

/*	@ManyToMany(fetch=FetchType.EAGER)

//	@ManyToMany(fetch=FetchType.EAGER)
//	@JoinTable(name="TR_UN_JT", 
//	joinColumns=@JoinColumn(name="UN_ID"), 
//	inverseJoinColumns=@JoinColumn(name="T_ID"))
//	private List<Trainer> trainer;
	
/*	@ManyToMany(fetch=FetchType.EAGER)

	@JoinTable(name="R_UN_JT", 

	joinColumns=@JoinColumn(name="UN_ID"), 

	inverseJoinColumns=@JoinColumn(name="R_ID"))

	private List<Room> room;


*/



	public Unavailable() {

		super();


//		this.trainer = new ArrayList<Trainer>();

//		this.room = new ArrayList<Room>();


//		this.trainer = new ArrayList<Trainer>();
//		this.room = new ArrayList<Room>();

	}



	public Unavailable(int unavailableID, Timestamp unavailableStartDate, Timestamp unavailableEndDate) {

		super();

		this.unavailableID = unavailableID;

		this.unavailableStartDate = unavailableStartDate;

		this.unavailableEndDate = unavailableEndDate;

	}



	public Unavailable(Timestamp unavailableStartDate, Timestamp unavailableEndDate) {

		super();

		this.unavailableStartDate = unavailableStartDate;

		this.unavailableEndDate = unavailableEndDate;

	}



	public Unavailable(int unavailableID, Timestamp unavailableStartDate, Timestamp unavailableEndDate,


			List<Room> room) {


		super();

		this.unavailableID = unavailableID;

		this.unavailableStartDate = unavailableStartDate;

		this.unavailableEndDate = unavailableEndDate;


//		this.room = room;

	}



	public int getUnavailableID() {

		return unavailableID;

	}



	public void setUnavailableID(int unavailableID) {

		this.unavailableID = unavailableID;

	}



	public Timestamp getUnavailableStartDate() {

		return unavailableStartDate;

	}



	public void setUnavailableStartDate(Timestamp unavailableStartDate) {

		this.unavailableStartDate = unavailableStartDate;

	}



	public Timestamp getUnavailableEndDate() {

		return unavailableEndDate;

	}



	public void setUnavailableEndDate(Timestamp unavailableEndDate) {

		this.unavailableEndDate = unavailableEndDate;


	}



//	public List<Trainer> getTrainer() {

//		return trainer;

//	}

//

//	public void setTrainer(List<Trainer> trainer) {

//		this.trainer = trainer;

//	}



/*	public List<Room> getRoom() {

=======
//	public List<Trainer> getTrainer() {
//		return trainer;
//	}
//
//	public void setTrainer(List<Trainer> trainer) {
//		this.trainer = trainer;
//	}

/*	public List<Room> getRoom() {
>>>>>>> feature-createB
		return room;

	}



	public void setRoom(List<Room> room) {

		this.room = room;

	}
<<<<<<< HEAD

*/



	@Override
	public String toString() {
		return "Unavailable [unavailableID=" + unavailableID + ", unavailableStartDate=" + unavailableStartDate
				+ ", unavailableEndDate=" + unavailableEndDate + "]";
	}
}
