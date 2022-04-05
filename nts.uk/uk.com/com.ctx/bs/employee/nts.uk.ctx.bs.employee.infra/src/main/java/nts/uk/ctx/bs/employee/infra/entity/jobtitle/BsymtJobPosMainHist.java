package nts.uk.ctx.bs.employee.infra.entity.jobtitle;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import nts.arc.layer.infra.data.entity.type.GeneralDateToDBConverter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class BsymtJobInfo.
 */
@Entity
@Table(name = "BSYMT_JOB_POST_MAIN_HIST")
public class BsymtJobPosMainHist extends ContractUkJpaEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Size(min = 1, max = 36)
	@Column(name = "HIST_ID")
	public String histId;
	
	/** The start date. */
	@Column(name = "START_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
	public GeneralDate startDate;

	/** The end date. */
	@Column(name = "END_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
	public GeneralDate endDate;

	@Override
	protected Object getKey() {
		return this.histId;
	}

}
