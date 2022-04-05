/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.jobtitle.info;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceCode;

/**
 * The Class JobTitleInfo.
 */
@Getter
// 職位情報
public class JobTitleInfo extends AggregateRoot {

	/** The company id. */
	// 会社ID
	private CompanyId companyId;

	/** The job title history id. */
	// 職位履歴ID
	private String jobTitleHistoryId;

	/** The is manager. */
	// 管理職とする
	private boolean isManager;
	
	/** The job title id. */
	// 職位ID
	private String jobTitleId;

	/** The job title code. */
	// 職位コード
	private JobTitleCode jobTitleCode;

	/** The job title name. */
	// 職位名称
	private JobTitleName jobTitleName;

	/** The sequence code. */
	// 序列コード
	private SequenceCode sequenceCode;	
	
	/**
	 * Instantiates a new job title info.
	 */
	public JobTitleInfo() {
		super();
	}

	public JobTitleInfo(CompanyId companyId, String jobTitleHistoryId, boolean isManager, String jobTitleId,
			JobTitleCode jobTitleCode, JobTitleName jobTitleName, SequenceCode sequenceCode) {
		super();
		this.companyId = companyId;
		this.jobTitleHistoryId = jobTitleHistoryId;
		this.isManager = isManager;
		this.jobTitleId = jobTitleId;
		this.jobTitleCode = jobTitleCode;
		this.jobTitleName = jobTitleName;
		this.sequenceCode = sequenceCode;
	}

	/**
	 * Instantiates a new job title info.
	 *
	 * @param memento the memento
	 */
	public JobTitleInfo(JobTitleInfoGetMemento memento) {
		this.companyId = memento.getCompanyId();
		this.jobTitleHistoryId = memento.getJobTitleHistoryId();
		this.isManager = memento.isManager();
		this.jobTitleId = memento.getJobTitleId();
		this.jobTitleCode = memento.getJobTitleCode();
		this.jobTitleName = memento.getJobTitleName();
		this.sequenceCode = memento.getSequenceCode();
	}

	/**
	 * Save to memento.
	 *
	 * @param memento the memento
	 */
	public void saveToMemento(JobTitleInfoSetMemento memento) {
		memento.setCompanyId(this.companyId);
		memento.setJobTitleHistoryId(this.jobTitleHistoryId);
		memento.setIsManager(this.isManager);
		memento.setJobTitleId(this.jobTitleId);
		memento.setJobTitleCode(this.jobTitleCode);
		memento.setJobTitleName(this.jobTitleName);
		memento.setSequenceCode(this.sequenceCode);
	}

	/**
	 * Clone.
	 *
	 * @param historyId the history id
	 * @return the job title info
	 */
	public JobTitleInfo clone(String historyId) {
		final JobTitleInfo newEntity = new JobTitleInfo();
		newEntity.companyId = this.companyId;
		newEntity.jobTitleHistoryId = historyId;
		newEntity.isManager = this.isManager;
		newEntity.jobTitleId = this.jobTitleId;
		newEntity.jobTitleCode = this.jobTitleCode;
		newEntity.jobTitleName = this.jobTitleName;
		newEntity.sequenceCode = this.sequenceCode;
		return newEntity;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((companyId == null) ? 0 : companyId.hashCode());
		result = prime * result + ((jobTitleHistoryId == null) ? 0 : jobTitleHistoryId.hashCode());
		result = prime * result + ((jobTitleId == null) ? 0 : jobTitleId.hashCode());
		return result;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof JobTitleInfo))
			return false;
		JobTitleInfo other = (JobTitleInfo) obj;
		if (companyId == null) {
			if (other.companyId != null)
				return false;
		} else if (!companyId.equals(other.companyId))
			return false;
		if (jobTitleHistoryId == null) {
			if (other.jobTitleHistoryId != null)
				return false;
		} else if (!jobTitleHistoryId.equals(other.jobTitleHistoryId))
			return false;
		if (jobTitleId == null) {
			if (other.jobTitleId != null)
				return false;
		} else if (!jobTitleId.equals(other.jobTitleId))
			return false;
		return true;
	}
}
