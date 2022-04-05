/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.jobtitle.info.dto;

import lombok.Data;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleCode;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleName;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceCode;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceMasterSetMemento;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceName;

/**
 * The Class JobTitleInfoFindDto.
 */
@Data
public class JobTitleInfoFindDto implements JobTitleInfoSetMemento, SequenceMasterSetMemento {

	/** The company id. */
	private String companyId;

	/** The job title id. */
	private String jobTitleId;

	/** The job title history id. */
	private String jobTitleHistoryId;

	/** The is manager. */
	private boolean isManager;

	/** The job title code. */
	private String jobTitleCode;

	/** The job title name. */
	private String jobTitleName;

	/** The sequence code. */
	private String sequenceCode;

	/** The sequence name. */
	private String sequenceName;

	/** The order. */
	private int order;

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento#
	 * setCompanyId(nts.uk.ctx.bs.employee.dom.common.CompanyId)
	 */
	@Override
	public void setCompanyId(CompanyId companyId) {
		this.companyId = companyId.v();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento#
	 * setJobTitleId(nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleId)
	 */
	@Override
	public void setJobTitleId(String jobTitleId) {
		this.jobTitleId = jobTitleId;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento#
	 * setJobTitleHistoryId(nts.uk.ctx.bs.employee.dom.jobtitle.history.
	 * HistoryId)
	 */
	@Override
	public void setJobTitleHistoryId(String jobTitleHistoryId) {
		this.jobTitleHistoryId = jobTitleHistoryId;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento#
	 * setIsManager(boolean)
	 */
	@Override
	public void setIsManager(boolean isManager) {
		this.isManager = isManager;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento#
	 * setJobTitleCode(nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleCode)
	 */
	@Override
	public void setJobTitleCode(JobTitleCode jobTitleCode) {
		this.jobTitleCode = jobTitleCode.v();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento#
	 * setJobTitleName(nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleName)
	 */
	@Override
	public void setJobTitleName(JobTitleName jobTitleName) {
		this.jobTitleName = jobTitleName.v();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento#
	 * setSequenceCode(nts.uk.ctx.bs.employee.dom.jobtitle.info.SequenceCode)
	 */
	@Override
	public void setSequenceCode(SequenceCode sequenceCode) {
		if (sequenceCode == null) {
			return;
		}
		this.sequenceCode = sequenceCode.v();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.SequenceMasterSetMemento#
	 * setOrder(short)
	 */
	@Override
	public void setOrder(int order) {
		this.order = order;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.SequenceMasterSetMemento#
	 * setSequenceName(nts.uk.ctx.bs.employee.dom.jobtitle.info.SequenceName)
	 */
	@Override
	public void setSequenceName(SequenceName sequenceName) {
		this.sequenceName = sequenceName.v();
	}
}
