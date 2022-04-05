/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.jobtitle;

import org.apache.commons.lang3.StringUtils;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.bs.employee.app.command.jobtitle.dto.JobTitleInfoDto;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleCode;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfo;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleName;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceCode;

/**
 * The Class SaveJobTitleCommand.
 */
@Getter
@Setter
public class SaveJobTitleCommand {

	/** The is create mode. */
	private Boolean isCreateMode;

	/** The job title info. */
	private JobTitleInfoDto jobTitleInfo;

	/**
	 * To domain.
	 *
	 * @param companyId
	 *            the company id
	 * @return the job title info
	 */
	public JobTitleInfo toDomain(String companyId) {
		return new JobTitleInfo(new JobTitleInfoGetMementoImpl(companyId, this));
	}

	/**
	 * The Class JobTitleInfoGetMementoImpl.
	 */
	public class JobTitleInfoGetMementoImpl implements JobTitleInfoGetMemento {

		/** The company id. */
		private String companyId;

		/** The save command. */
		private SaveJobTitleCommand saveCommand;

		/**
		 * Instantiates a new job title info get memento impl.
		 *
		 * @param companyId
		 *            the company id
		 * @param saveCommand
		 *            the save command
		 */
		public JobTitleInfoGetMementoImpl(String companyId, SaveJobTitleCommand saveCommand) {
			this.companyId = companyId;
			this.saveCommand = saveCommand;
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
		 * getCompanyId()
		 */
		@Override
		public CompanyId getCompanyId() {
			return new CompanyId(this.companyId);
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
		 * getJobTitleHistoryId()
		 */
		@Override
		public String getJobTitleHistoryId() {
			return this.saveCommand.getJobTitleInfo().getJobTitleHistoryId();
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
		 * getJobTitleId()
		 */
		@Override
		public String getJobTitleId() {
			return this.saveCommand.getJobTitleInfo().getJobTitleId();
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
		 * getJobTitleCode()
		 */
		@Override
		public JobTitleCode getJobTitleCode() {
			return new JobTitleCode(this.saveCommand.getJobTitleInfo().getJobTitleCode());
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
		 * getJobTitleName()
		 */
		@Override
		public JobTitleName getJobTitleName() {
			return new JobTitleName(this.saveCommand.getJobTitleInfo().getJobTitleName());
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
		 * getSequenceCode()
		 */
		@Override
		public SequenceCode getSequenceCode() {
			String sequenceCode = this.saveCommand.getJobTitleInfo().getSequenceCode();
			if (StringUtils.isEmpty(sequenceCode)) {
				return null;
			}
			return new SequenceCode(sequenceCode);
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
		 * getIsManager()
		 */
		@Override
		public boolean isManager() {
			return this.saveCommand.getJobTitleInfo().getIsManager();
		}
	}
}
