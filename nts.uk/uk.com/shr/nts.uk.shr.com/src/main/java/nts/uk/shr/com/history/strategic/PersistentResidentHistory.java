package nts.uk.shr.com.history.strategic;

import java.util.Arrays;
import java.util.List;

import nts.gul.util.value.DiscreteValue;
import nts.uk.shr.com.history.HistoryItem;
import nts.uk.shr.com.history.constraint.HistoryConstraint;
import nts.uk.shr.com.history.constraint.MustBeResident;
import nts.arc.time.calendar.period.GeneralPeriod;

/**
 * PersistentResidentHistory
 *
 * @param <S> self
 * @param <D> endpoint
 */
public interface PersistentResidentHistory<H extends HistoryItem<S, D>, S extends GeneralPeriod<S, D>, D extends Comparable<D> & DiscreteValue<D>>
		extends PersistentHistory<H, S, D> {

	@Override
	default List<HistoryConstraint<H, S, D>> constraints() {
		return Arrays.asList(new MustBeResident<>());
	}
}
