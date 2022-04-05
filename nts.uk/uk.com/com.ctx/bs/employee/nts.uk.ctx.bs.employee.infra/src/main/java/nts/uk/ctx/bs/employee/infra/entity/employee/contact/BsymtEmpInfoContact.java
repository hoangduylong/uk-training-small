package nts.uk.ctx.bs.employee.infra.entity.employee.contact;

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
@Table(name = "BSYMT_EMP_INFO_CONTACT")
public class BsymtEmpInfoContact extends ContractUkJpaEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	public BsymtEmpInfoContactPK bsymtEmpInfoContactPK;

	
	@Basic(optional = false)
	@Column(name = "CID")
	public String cid;
	
	@Basic(optional = true)
	@Column(name = "CELL_PHONE_NO")
	public String cellPhoneNo;
	
	@Basic(optional = true)
	@Column(name = "MAIL_ADDRESS")
	public String mailAdress;
	
	@Basic(optional = true)
	@Column(name = "PHONE_MAIL_ADDRESS")
	public String phoneMailAddress;
	
	@Basic(optional = true)
	@Column(name = "SEAT_DIAL_IN")
	public String seatDialIn;
	
	@Basic(optional = true)
	@Column(name = "SEAT_EXTENSION_NO")
	public String seatExtensionNo;
	


	
	@Override
	protected Object getKey() {
		// TODO Auto-generated method stub
		return this.bsymtEmpInfoContactPK;
	}
}
