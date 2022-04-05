/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.jobtitle.dto;

import java.util.Arrays;
import java.util.List;

import lombok.Data;
import nts.gul.text.IdentifierUtil;
import nts.gul.text.StringUtil;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitle;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleGetMemento;
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistory;

/**
 * Instantiates a new job title dto.
 */
@Data
public class JobTitleDto {
	
    /** The job title id. */
    private String jobTitleId;
    
    /** The job title history. */
    private JobTitleHistoryDto jobTitleHistory;
    
    /**
     * To domain.
     *
     * @param companyId the company id
     * @return the job title
     */
    public JobTitle toDomain(String companyId) {
        return new JobTitle(new JobTitleGetMementoImpl(companyId, this));
    }
    
    /**
     * The Class JobTitleGetMementoImpl.
     */
    class JobTitleGetMementoImpl implements JobTitleGetMemento {

        /** The company id. */
        private String companyId;

        /** The dto. */
        private JobTitleDto dto;

        /**
         * Instantiates a new job title get memento impl.
         *
         * @param companyId the company id
         * @param dto the dto
         */
        public JobTitleGetMementoImpl(String companyId, JobTitleDto dto) {
            this.companyId = companyId;
            this.dto = dto;
        }

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleGetMemento#getCompanyId()
		 */
		@Override
		public CompanyId getCompanyId() {
			return new CompanyId(this.companyId);
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleGetMemento#getJobTitleId()
		 */
		@Override
		public String getJobTitleId() {
			String jobTitleId = this.dto.getJobTitleId();
            if (StringUtil.isNullOrEmpty(jobTitleId, true)) {
            	jobTitleId = IdentifierUtil.randomUniqueId();
            }
            return jobTitleId;
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleGetMemento#getJobTitleHistory()
		 */
		@Override
		public List<JobTitleHistory> getJobTitleHistory() {
			return Arrays.asList(this.dto.getJobTitleHistory().toDomain());
		}
    }
}
