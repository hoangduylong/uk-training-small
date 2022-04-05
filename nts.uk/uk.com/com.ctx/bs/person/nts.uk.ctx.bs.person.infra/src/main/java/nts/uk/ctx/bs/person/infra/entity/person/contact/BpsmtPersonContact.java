package nts.uk.ctx.bs.person.infra.entity.person.contact;

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
@Table(name = "BPSMT_PERSON_CONTACT")
public class BpsmtPersonContact  extends ContractUkJpaEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	public BpsmtPersonContactPK bpsmtPersonContactPK;

	@Basic(optional = true)
	@Column(name = "CELL_PHONE_NO")
	public String cellPhoneNumber;
	
	@Basic(optional = true)
	@Column(name = "MAIL_ADDRESS")
	public String mailAdress;

	@Basic(optional = true)
	@Column(name = "MOBILE_MAIL_ADDRESS")
	public String mobileMailAdress;
	
	@Basic(optional = true)
	@Column(name = "MEMO1")
	public String memo1;
	
	@Basic(optional = true)
	@Column(name = "CONTACT_NAME_1")
	public String contactName1;
	
	@Basic(optional = true)
	@Column(name = "PHONE_NO_1")
	public String phoneNo1;	
	
	@Basic(optional = true)
	@Column(name = "MEMO2")
	public String memo2;
	
	@Basic(optional = true)
	@Column(name = "CONTACT_NAME_2")
	public String contactName2;
	
	@Basic(optional = true)
	@Column(name = "PHONE_NO_2")
	public String phoneNo2;	

@Override
protected Object getKey() {
	return this.bpsmtPersonContactPK;
}

}
