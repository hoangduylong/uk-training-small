package nts.uk.ctx.bs.employee.infra.entity.workplace.assigned;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * 所属職場履歴
 * 
 * @author xuan vinh
 *
 */
@Entity
@Table(name = "BSYMT_ASSI_WORKPLACE")
public class BsymtAssiWorkplace extends ContractUkJpaEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** the assign workplace id */
	@Id
	@Basic(optional = false)
	@Column(name = "ASSI_WORKPLACE_ID")
	public String assiWorkplaceId;

	/** The emp id. */
	@Basic(optional = false)
	@Column(name = "SID")
	public String empId;

	/** the workplace id */
	@Basic(optional = false)
	@Column(name = "WORKPLACE_ID")
	public String workplaceId;

	@Basic(optional = false)
	@Column(name = "HIST_ID")
	public String histId;

	@Override
	protected Object getKey() {
		return this.assiWorkplaceId;
	}

}
