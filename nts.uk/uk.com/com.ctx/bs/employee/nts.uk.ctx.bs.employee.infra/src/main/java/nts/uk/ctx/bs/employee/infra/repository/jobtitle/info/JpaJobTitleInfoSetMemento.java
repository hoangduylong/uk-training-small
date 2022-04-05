/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.jobtitle.info;

import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleCode;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleName;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceCode;
import nts.uk.ctx.bs.employee.infra.entity.jobtitle.BsymtJobInfo;
import nts.uk.ctx.bs.employee.infra.entity.jobtitle.BsymtJobInfoPK;

/**
 * The Class JpaJobTitleInfoSetMemento.
 */
public class JpaJobTitleInfoSetMemento implements JobTitleInfoSetMemento {

	/** The entity. */
    private BsymtJobInfo entity;
	
    /**
     * Instantiates a new jpa job title info set memento.
     *
     * @param entity the entity
     */
    public JpaJobTitleInfoSetMemento(BsymtJobInfo entity) {
        if (entity != null && entity.getBsymtJobInfoPK() == null) {
            entity.setBsymtJobInfoPK(new BsymtJobInfoPK());
        }
        this.entity = entity;
    }
    
	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento#setCompanyId(nts.uk.ctx.bs.employee.dom.common.CompanyId)
	 */
	@Override
	public void setCompanyId(CompanyId companyId) {
		this.entity.getBsymtJobInfoPK().setCid(companyId.v());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento#setJobTitleHistoryId(nts.uk.ctx.bs.employee.dom.jobtitle.HistoryId)
	 */
	@Override
	public void setJobTitleHistoryId(String jobTitleHistoryId) {
		this.entity.getBsymtJobInfoPK().setHistId(jobTitleHistoryId);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento#setJobTitleId(nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleId)
	 */
	@Override
	public void setJobTitleId(String jobTitleId) {
		this.entity.getBsymtJobInfoPK().setJobId(jobTitleId);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento#setJobTitleCode(nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleCode)
	 */
	@Override
	public void setJobTitleCode(JobTitleCode jobTitleCode) {
		this.entity.setJobCd(jobTitleCode.v());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento#setJobTitleName(nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleName)
	 */
	@Override
	public void setJobTitleName(JobTitleName jobTitleName) {
		this.entity.setJobName(jobTitleName.v());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento#setSequenceCode(nts.uk.ctx.bs.employee.dom.jobtitle.info.SequenceCode)
	 */
	@Override
	public void setSequenceCode(SequenceCode sequenceCode) {
		if (sequenceCode == null) {
			this.entity.setSequenceCd(null);
			return;
		}
		this.entity.setSequenceCd(sequenceCode.v());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoSetMemento#setIsManager(boolean)
	 */
	@Override
	public void setIsManager(boolean isManager) {
		if (isManager) {
			this.entity.setIsManager(IsManagerStatus.TRUE.value);
		} 
		else {
			this.entity.setIsManager(IsManagerStatus.FALSE.value);
		}		
	}
}
