/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.jobtitle.history;

import java.util.Arrays;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.bs.employee.app.command.jobtitle.dto.JobTitleHistoryDto;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitle;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleGetMemento;
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistory;

/**
 * The Class SaveJobTitleHistoryCommand.
 */
@Getter
@Setter
public class SaveJobTitleHistoryCommand {

    /** The is create mode. */
    private Boolean isCreateMode;
    
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
    public class JobTitleGetMementoImpl implements JobTitleGetMemento {

        /** The company id. */
        private String companyId;

        /** The save command. */
        private SaveJobTitleHistoryCommand saveCommand;

        /**
         * Instantiates a new job title get memento impl.
         *
         * @param companyId the company id
         * @param saveCommand the save command
         */
        public JobTitleGetMementoImpl(String companyId, SaveJobTitleHistoryCommand saveCommand) {
            this.companyId = companyId;
            this.saveCommand = saveCommand;
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
			return this.saveCommand.getJobTitleId();
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleGetMemento#getJobTitleHistory()
		 */
		@Override
		public List<JobTitleHistory> getJobTitleHistory() {
			return Arrays.asList(this.saveCommand.getJobTitleHistory().toDomain());
		}
    }
}
