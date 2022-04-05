package nts.uk.ctx.bs.employee.infra.entity.department;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class bsymt current affiliation department
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "BSYMT_CURR_AFFI_DEPT")
public class BsymtCurrAffiDept extends ContractUkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	/** the current affi dept id */
	@Id
	@Basic(optional = false)
	@Column(name = "AFFI_DEPT_ID")
	public String affiDeptId;

	/** The sid. */
	@Column(name = "SID")
	public String sid;

	/** The dep id. */
	@Column(name = "DEP_ID")
	public String depId;

	/** The dep id. */
	@Column(name = "HIST_ID")
	public String histId;
	
	@Override
	protected Object getKey() {
		return this.affiDeptId;
	}

}
