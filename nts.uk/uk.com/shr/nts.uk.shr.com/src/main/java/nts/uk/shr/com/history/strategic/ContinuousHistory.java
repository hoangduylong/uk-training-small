package nts.uk.shr.com.history.strategic;

import nts.arc.error.BusinessException;
import nts.gul.util.value.DiscreteValue;
import nts.uk.shr.com.history.History;
import nts.uk.shr.com.history.HistoryItem;
import nts.arc.time.calendar.period.GeneralPeriod;

/**
 * ContinuousHistory
 *
 * @param <S> self
 * @param <D> endpoint
 */
public interface ContinuousHistory<H extends HistoryItem<S, D>, S extends GeneralPeriod<S, D>, D extends Comparable<D> & DiscreteValue<D>>
		extends History<H, S, D> {

	@Override
	default void add(H itemToBeAdded) {
		
		this.constraints().forEach(c -> c.validateIfCanAdd(this, itemToBeAdded));
		this.exValidateIfCanAdd(itemToBeAdded);
		if (itemToBeAdded.span().isReversed()) {
			throw new BusinessException("Msg_917");
		}
		this.latestStartItem().ifPresent(latest -> {
			boolean validStart = latest.span().isStart().before(itemToBeAdded.start());
			boolean validEnd = latest.span().isEnd().beforeOrEqual(itemToBeAdded.end());
			if (!(validStart && validEnd)) {
				throw new BusinessException("Msg_102");
			}
			
			latest.shortenEndToAccept(itemToBeAdded);
		});
		
		this.exCorrectToAdd(itemToBeAdded);
		
		this.items().add(itemToBeAdded);
	}

	@Override
	default void remove(H itemToBeRemoved) {

		this.constraints().forEach(c -> c.validateIfCanRemove(this, itemToBeRemoved));
		this.exValidateIfCanRemove(itemToBeRemoved);

		// this should be restricted by UI
		this.latestStartItem().ifPresent(latest -> {
			if (!latest.equals(itemToBeRemoved)) {
				throw new RuntimeException("just only latest item can be removed.");
			}
		});
		
		// if no items, no error (common default spec)
		this.items().remove(itemToBeRemoved);
		
		this.exCorrectToRemove(itemToBeRemoved);
	}

	@Override
	default void changeSpan(H itemToBeChanged, S newSpan) {

		this.constraints().forEach(c -> c.validateIfCanChangeSpan(this, itemToBeChanged, newSpan));
		this.exValidateIfCanChangeSpan(itemToBeChanged, newSpan);
		if (newSpan.isReversed()) {
			throw new BusinessException("Msg_917");
		}
		this.immediatelyBefore(itemToBeChanged).ifPresent(immediatelyBefore -> {

			if (!(immediatelyBefore.span().isStart().before(newSpan.start()))) {
				throw new BusinessException("Msg_127");
			}
			
			immediatelyBefore.shortenEndToAccept(newSpan);
		});
		
		this.exCorrectToChangeSpan(itemToBeChanged, newSpan);

		itemToBeChanged.changeSpan(newSpan);
	}

	default void exValidateIfCanAdd(H itemToBeAdded) {
	}
	
	default void exCorrectToAdd(H itemToBeAdded) {
	}
	
	default void exValidateIfCanRemove(H itemToBeRemoved) {
	}
	
	default void exCorrectToRemove(H itemToBeRemoved) {
	}
	
	default void exValidateIfCanChangeSpan(H itemToBeChanged, S newSpan) {
	}
	
	default void exCorrectToChangeSpan(H itemToBeChanged, S newSpan) {
	}
}
