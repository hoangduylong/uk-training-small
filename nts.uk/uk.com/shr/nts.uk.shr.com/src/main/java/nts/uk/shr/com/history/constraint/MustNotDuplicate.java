package nts.uk.shr.com.history.constraint;

import nts.arc.error.BusinessException;
import nts.gul.util.range.RangeDuplication;
import nts.gul.util.value.DiscreteValue;
import nts.uk.shr.com.history.History;
import nts.uk.shr.com.history.HistoryItem;
import nts.arc.time.calendar.period.GeneralPeriod;

/**
 * MustNotDuplicate
 *
 * @param <S>
 * @param <D>
 */
public class MustNotDuplicate<H extends HistoryItem<S, D>, S extends GeneralPeriod<S, D>, D extends Comparable<D> & DiscreteValue<D>>
		implements HistoryConstraint<H, S, D>{

	@Override
	public void validateIfCanAdd(History<H, S, D> history, HistoryItem<S, D> itemToBeAdded) {
		
		boolean isDuplicated = history.items().stream()
				.anyMatch(e -> isDuplicated(e.span().compare(itemToBeAdded.span())));
		
		if (isDuplicated) {
			throw new BusinessException("Msg_106");
		}
	}

	@Override
	public void validateIfCanRemove(History<H, S, D> history, HistoryItem<S, D> itemToBeRemoved) {
	}

	@Override
	public void validateIfCanChangeSpan(History<H, S, D> history, HistoryItem<S, D> itemToBeChanged, S newSpan) {
		
		boolean isDuplicated = history.items().stream()
				.filter(e -> !e.equals(itemToBeChanged))
				.anyMatch(e -> isDuplicated(e.span().compare(newSpan)));
		
		if (isDuplicated) {
			throw new BusinessException("Msg_107");
		}
	}


	private static boolean isDuplicated(RangeDuplication duplication) {
		switch (duplication) {
		case BASE_AFTER_COMPARED:
		case BASE_BEFORE_COMPARED:
			return false;
		default:
			return true;
		}
	}
}
