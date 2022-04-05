package nts.uk.ctx.bs.employee.app.command.jobtitle.dto;

import lombok.Getter;
import lombok.Setter;
import nts.gul.text.IdentifierUtil;
import nts.gul.text.StringUtil;
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistory;
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistoryGetMemento;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class JobTitleHistoryDto.
 */
@Getter
@Setter
public class JobTitleHistoryDto {

	/** The history id. */
	private String historyId;

	/** The period. */
	private PeriodDto period;

	/**
	 * To domain.
	 *
	 * @return the job title history
	 */
	public JobTitleHistory toDomain() {
		return new JobTitleHistory(new JobTitleHistoryGetMementoImpl(this));
	}

	/**
	 * The Class JobTitleHistoryGetMementoImpl.
	 */
	class JobTitleHistoryGetMementoImpl implements JobTitleHistoryGetMemento {

		/** The job title history dto. */
		private JobTitleHistoryDto dto;

		/**
		 * Instantiates a new job title history get memento impl.
		 *
		 * @param jobTitleHistoryDto the job title history dto
		 */
		public JobTitleHistoryGetMementoImpl(JobTitleHistoryDto dto) {
			this.dto = dto;
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistoryGetMemento#getHistoryId()
		 */
		@Override
		public String getHistoryId() {
			String historyId = this.dto.getHistoryId();
			if (StringUtil.isNullOrEmpty(historyId, true)) {
				historyId = IdentifierUtil.randomUniqueId();
			}
			return historyId;
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistoryGetMemento#getPeriod()
		 */
		@Override
		public DatePeriod getPeriod() {
			return new DatePeriod(this.dto.getPeriod().getStartDate(),
					this.dto.getPeriod().getEndDate());
		}
	}
}
