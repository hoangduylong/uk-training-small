package nts.uk.shr.com.history.constraint;

import nts.gul.util.value.DiscreteValue;
import nts.uk.shr.com.history.History;
import nts.uk.shr.com.history.HistoryItem;
import nts.arc.time.calendar.period.GeneralPeriod;

public interface HistoryConstraint<H extends HistoryItem<S, D>, S extends GeneralPeriod<S, D>, D extends Comparable<D> & DiscreteValue<D>> {

	void validateIfCanAdd(History<H, S, D> history, HistoryItem<S, D> itemToBeAdded);
	void validateIfCanRemove(History<H, S, D> history, HistoryItem<S, D> itemToBeRemoved);
	void validateIfCanChangeSpan(History<H, S, D> history, HistoryItem<S, D> itemToBeChanged, S newSpan);
	
}
