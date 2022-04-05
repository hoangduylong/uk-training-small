package nts.uk.ctx.bs.employee.infra.repository.jobtitle;

import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistoryGetMemento;
import nts.uk.ctx.bs.employee.infra.entity.jobtitle.BsymtJobHist;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class JpaJobTitleHistoryGetMemento.
 */
public class JpaJobTitleHistoryGetMemento implements JobTitleHistoryGetMemento {

	/** The entity. */
	private BsymtJobHist entity;
	
	/**
	 * Instantiates a new jpa job title history get memento.
	 *
	 * @param item the item
	 */
	public JpaJobTitleHistoryGetMemento(BsymtJobHist entity) {
		this.entity = entity;
	}
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleHistoryGetMemento#getHistoryId()
	 */
	@Override
	public String getHistoryId() {
		return this.entity.getBsymtJobHistPK().getHistId();
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleHistoryGetMemento#getPeriod()
	 */
	@Override
	public DatePeriod getPeriod() {
		return new DatePeriod(this.entity.getStartDate(), this.entity.getEndDate());
	}

}
