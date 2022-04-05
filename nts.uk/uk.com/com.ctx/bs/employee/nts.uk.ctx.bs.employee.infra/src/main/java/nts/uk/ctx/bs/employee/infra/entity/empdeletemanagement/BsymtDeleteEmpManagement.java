package nts.uk.ctx.bs.employee.infra.entity.empdeletemanagement;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Getter
@Setter
@Entity
@Table(name = "BSYMT_DEL_EMP_MANAGENMENT")
public class BsymtDeleteEmpManagement extends ContractUkJpaEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	protected BsymtDeleteEmpManagementPK bsymtDeleteEmpManagementPK;
	
	/** The name. */
	@Basic(optional = false)
	@Column(name = "REASON_REMOVE_EMP")
	private String reason;
	
	@Basic(optional = true)
	@Column(name = "DELETE_DATE")
	private GeneralDate deleteDate;
	
	@Basic(optional = true)
	@Column(name = "IS_DELETED")
	private int isDeleted;

	@Override
	protected Object getKey() {
		// TODO Auto-generated method stub
		return null;
	}

}
