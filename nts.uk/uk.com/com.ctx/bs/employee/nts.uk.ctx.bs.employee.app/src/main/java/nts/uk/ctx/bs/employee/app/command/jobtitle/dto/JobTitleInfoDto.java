/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.jobtitle.dto;

import org.apache.commons.lang3.StringUtils;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleCode;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfo;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleName;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceCode;

/**
 * The Class JobTitleInfoDto.
 */
@Getter
@Setter
public class JobTitleInfoDto {

	/** The company id. */
	private String companyId;

	/** The job title id. */
	private String jobTitleId;

	/** The job title history id. */
	private String jobTitleHistoryId;

	/** The is manager. */
	private Boolean isManager;

	/** The job title code. */
	private String jobTitleCode;

	/** The job title name. */
	private String jobTitleName;

	/** The sequence code. */
	private String sequenceCode;

	/**
	 * To domain.
	 *
	 * @param companyId
	 *            the company id
	 * @param jobTitleId
	 *            the job title id
	 * @param historyId
	 *            the history id
	 * @return the job title info
	 */
	public JobTitleInfo toDomain(String companyId, String jobTitleId, String historyId) {
		return new JobTitleInfo(new JobTitleInfoGetMementoImpl(companyId, jobTitleId, historyId, this));
	}

	/**
	 * The Class JobTitleInfoGetMementoImpl.
	 */
	class JobTitleInfoGetMementoImpl implements JobTitleInfoGetMemento {

		/** The company id. */
		private String companyId;

		/** The job title id. */
		private String jobTitleId;

		/** The history id. */
		private String historyId;

		/** The dto. */
		private JobTitleInfoDto dto;

		/**
		 * Instantiates a new job title info get memento impl.
		 *
		 * @param companyId
		 *            the company id
		 * @param jobTitleId
		 *            the job title id
		 * @param historyId
		 *            the history id
		 * @param dto
		 *            the dto
		 */
		public JobTitleInfoGetMementoImpl(String companyId, String jobTitleId, String historyId, JobTitleInfoDto dto) {
			this.companyId = companyId;
			this.jobTitleId = jobTitleId;
			this.historyId = historyId;
			this.dto = dto;
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
			return this.historyId;
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
		 * getJobTitleId()
		 */
		@Override
		public String getJobTitleId() {
			return this.jobTitleId;
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
		 * getJobTitleCode()
		 */
		@Override
		public JobTitleCode getJobTitleCode() {
			return new JobTitleCode(this.dto.getJobTitleCode());
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
		 * getJobTitleName()
		 */
		@Override
		public JobTitleName getJobTitleName() {
			return new JobTitleName(this.dto.getJobTitleName());
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoGetMemento#
		 * getSequenceCode()
		 */
		@Override
		public SequenceCode getSequenceCode() {
			String sequenceCode = this.dto.getSequenceCode();
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
			return this.dto.getIsManager();
		}
	}
}
