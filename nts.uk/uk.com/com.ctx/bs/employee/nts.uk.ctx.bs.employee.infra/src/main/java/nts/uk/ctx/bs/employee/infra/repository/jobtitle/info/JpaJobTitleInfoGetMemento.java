/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.jobtitle.info;

import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleCode;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleName;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceCode;
import nts.uk.ctx.bs.employee.infra.entity.jobtitle.BsymtJobInfo;

/**
 * The Class JpaJobTitleInfoGetMemento.
 */
public class JpaJobTitleInfoGetMemento implements JobTitleInfoGetMemento {

	/** The bsymt job info. */
	private BsymtJobInfo bsymtJobInfo;

	/**
	 * Instantiates a new jpa job title info get memento.
	 *
	 * @param item
	 *            the item
	 */
	public JpaJobTitleInfoGetMemento(BsymtJobInfo item) {
		this.bsymtJobInfo = item;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
	 * getCompanyId()
	 */
	@Override
	public CompanyId getCompanyId() {
		return new CompanyId(this.bsymtJobInfo.getBsymtJobInfoPK().getCid());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
	 * getJobTitleHistoryId()
	 */
	@Override
	public String getJobTitleHistoryId() {
		return this.bsymtJobInfo.getBsymtJobInfoPK().getHistId();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
	 * getJobTitleId()
	 */
	@Override
	public String getJobTitleId() {
		return this.bsymtJobInfo.getBsymtJobInfoPK().getJobId();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
	 * getJobTitleCode()
	 */
	@Override
	public JobTitleCode getJobTitleCode() {
		return new JobTitleCode(this.bsymtJobInfo.getJobCd());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
	 * getJobTitleName()
	 */
	@Override
	public JobTitleName getJobTitleName() {
		return new JobTitleName(this.bsymtJobInfo.getJobName());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
	 * getSequenceCode()
	 */
	@Override
	public SequenceCode getSequenceCode() {
		if (this.bsymtJobInfo.getSequenceCd() == null) {
			return null;
		}
		return new SequenceCode(this.bsymtJobInfo.getSequenceCd());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
	 * getIsManager()
	 */
	@Override
	public boolean isManager() {
		return IsManagerStatus.valueOf(this.bsymtJobInfo.getIsManager()).booleanValue;
	}
}
