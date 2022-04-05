package nts.uk.ctx.bs.employee.infra.entity.jobtitle;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import nts.arc.layer.infra.data.entity.JpaEntity;
/**
 * 職務職位
 * @author xuan vinh
 *
 */

@Entity
@Table(name="BSYMT_JOB_POSITION_MAIN")
public class BsymtJobTitleMain extends JpaEntity{

	@Id
	@Basic(optional = false)
	@Column(name = "JOB_TITLE_ID")
	public String jobTitleId;
	
	/**社員ID*/
	@Column(name = "SID")
	public String sId;
	
	/**社員ID*/
	@Column(name = "HIST_ID")
	public String histId;
	
	@Override
	protected Object getKey() {
		return jobTitleId;
	}
	
	
}
