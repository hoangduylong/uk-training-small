/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.config;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.apache.commons.lang3.builder.CompareToBuilder;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.strategic.PersistentResidentHistory;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class WorkplaceConfig.
 */
// 職場構成
public class WorkplaceConfig extends AggregateRoot
		implements PersistentResidentHistory<WorkplaceConfigHistory, DatePeriod, GeneralDate> {

	/** The company id. */
	// 会社ID
	@Getter
	private String companyId;

	/** The wkp config history. */
	// 履歴
	@Getter
	private List<WorkplaceConfigHistory> wkpConfigHistory;

	/**
	 * Instantiates a new workplace config.
	 *
	 * @param memento the memento
	 */
	public WorkplaceConfig(WorkplaceConfigGetMemento memento) {
		this.companyId = memento.getCompanyId();
		this.wkpConfigHistory = memento.getWkpConfigHistory();

		// sort by end date, start date desc
		Collections.sort(this.wkpConfigHistory, new Comparator<WorkplaceConfigHistory>() {
			@Override
			public int compare(WorkplaceConfigHistory obj1, WorkplaceConfigHistory obj2) {
				return new CompareToBuilder()
						.append(obj2.span().end(), obj1.span().end())
						.append(obj2.span().start(), obj1.span().start()).toComparison();
			}
		});
	}

	/**
	 * Gets the wkp config history latest.
	 *
	 * @return the wkp config history latest
	 */
	public WorkplaceConfigHistory getWkpConfigHistoryLatest() {
		int indexLatestHist = 0;
		return this.wkpConfigHistory.get(indexLatestHist);
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
		if (!(obj instanceof WorkplaceConfig))
			return false;
		WorkplaceConfig other = (WorkplaceConfig) obj;
		if (companyId == null) {
			if (other.companyId != null)
				return false;
		} else if (!companyId.equals(other.companyId))
			return false;
		return true;
	}

	/* (non-Javadoc)
	 * @see nts.uk.shr.com.history.History#items()
	 */
	@Override
	public List<WorkplaceConfigHistory> items() {
		return this.wkpConfigHistory;
	}

}
