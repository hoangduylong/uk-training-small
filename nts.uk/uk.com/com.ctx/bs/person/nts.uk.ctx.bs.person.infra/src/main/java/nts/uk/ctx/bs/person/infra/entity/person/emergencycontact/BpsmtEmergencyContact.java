package nts.uk.ctx.bs.person.infra.entity.person.emergencycontact;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "BPSMT_EMERGENCY_CONTACT")
public class BpsmtEmergencyContact extends ContractUkJpaEntity implements Serializable{/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	public BpsmtEmergencyContactPK bpsmtEmergencyContactPK;
	
	@Basic(optional = false)
	@Column(name = "PID")
	public String pid;
	
	@Basic(optional = false)
	@Column(name = "PERSON_NAME")
	public String personName;
	
	@Basic(optional = false)
	@Column(name = "MAIL_ADDRESS")
	public String mailAddress;
	
	@Basic(optional = false)
	@Column(name = "STREET_ADDRESS")
	public String streetAddress;
	
	@Basic(optional = false)
	@Column(name = "PHONE")
	public String phone;
	
	@Basic(optional = false)
	@Column(name = "RELATIONSHIP")
	public String relationShip;
	
	@Basic(optional = false)
	@Column(name = "PRIORITY")
	public int priority;



@Override
	protected Object getKey() {
		// TODO Auto-generated method stub
		return bpsmtEmergencyContactPK;
	}

}
