package nts.uk.ctx.bs.person.infra.entity.person.emergencycontact;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class BpsmtEmergencyContactPK implements Serializable {/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Basic(optional = false)
	@Column(name = "EMERGENCY_CT_ID")
	public String emergencyCtId;
	
}
