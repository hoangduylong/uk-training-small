package nts.uk.shr.com.history.constraint;

import nts.arc.error.BusinessException;
import nts.gul.util.value.DiscreteValue;
import nts.uk.shr.com.history.History;
import nts.uk.shr.com.history.HistoryItem;
import nts.arc.time.calendar.period.GeneralPeriod;

/**
 * MustBeResident
 *
 * @param <S>
 * @param <D>
 */
public class MustBeResident<H extends HistoryItem<S, D>, S extends GeneralPeriod<S, D>, D extends Comparable<D> & DiscreteValue<D>>
		implements HistoryConstraint<H, S, D>{

	@Override
	public void validateIfCanAdd(History<H, S, D> history, HistoryItem<S, D> itemToBeAdded) {
	}

	@Override
	public void validateIfCanRemove(History<H, S, D> history, HistoryItem<S, D> itemToBeRemoved) {
		
		if (history.items().isEmpty() || history.items().size() == 1) {
			throw new BusinessException("Msg_57");
		}
	}

	@Override
	public void validateIfCanChangeSpan(History<H, S, D> history, HistoryItem<S, D> itemToBeChanged, S newSpan) {
	}

}
