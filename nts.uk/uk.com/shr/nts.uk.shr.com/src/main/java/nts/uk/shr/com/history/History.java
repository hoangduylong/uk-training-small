package nts.uk.shr.com.history;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.val;
import nts.arc.error.BusinessException;
import nts.gul.util.value.DiscreteValue;
import nts.uk.shr.com.history.constraint.HistoryConstraint;
import nts.arc.time.calendar.period.GeneralPeriod;

import static java.util.Comparator.*;

import java.util.Collections;

public interface History<H extends HistoryItem<S, D>, S extends GeneralPeriod<S, D>, D extends Comparable<D> & DiscreteValue<D>> {
	
	List<H> items();
	
	default boolean isPresent() {
		return !isEmpty();
	}
	
	default boolean isEmpty() {
		return items().isEmpty();
	}
	
	default List<HistoryConstraint<H, S, D>> constraints() {
		return Collections.emptyList();
	}

	default void add(H itemToBeAdded) {
		if (itemToBeAdded.span().isReversed()) {
			throw new BusinessException("Msg_917");
		}
		
		this.constraints().forEach(c -> c.validateIfCanAdd(this, itemToBeAdded));
		this.items().add(itemToBeAdded);
	}
	
	default void remove(H itemToBeRemoved) {
		this.constraints().forEach(c -> c.validateIfCanRemove(this, itemToBeRemoved));
		this.items().remove(itemToBeRemoved);
	}
	
	/**
	 * 制約チェックを通さず強制的に削除する
	 * @param itemToBeRemoved
	 */
	default void removeForcively(H itemToBeRemoved) {
		this.items().remove(itemToBeRemoved);
	}
	
	default void changeSpan(H itemToBeChanged, S newSpan) {
		if (newSpan.isReversed()) {
			throw new BusinessException("Msg_917");
		}
		
		this.constraints().forEach(c -> c.validateIfCanChangeSpan(this, itemToBeChanged, newSpan));
		itemToBeChanged.changeSpan(newSpan);
	}
	
	default List<H> itemsStartAscending() {
		return this.items().stream()
				.sorted(comparing(item -> item.span().start()))
				.collect(Collectors.toList());
	}
	
	default List<H> itemsStartDescending() {
		return this.items().stream()
				.sorted(comparing(item -> item.span().start(), reverseOrder()))
				.collect(Collectors.toList());
	}
	
	default Optional<H> latestStartItem() {
		return this.itemsStartDescending().stream().findFirst();
	}
	
	default Optional<H> immediatelyBefore(HistoryItem<S, D> baseItem) {
		H immediatelyBefore = null;
		for (val currentItem : this.itemsStartAscending()) {
			if (currentItem.equals(baseItem)) {
				return Optional.ofNullable(immediatelyBefore);
			}
			
			immediatelyBefore = currentItem;
		}
		
		return Optional.empty();
	}
	
	default Optional<H> immediatelyAfter(HistoryItem<S, D> baseItem) {
		H immediatelyAfter = null;
		for (val currentItem : this.itemsStartDescending()) {
			if (currentItem.equals(baseItem)) {
				return Optional.ofNullable(immediatelyAfter);
			}
			
			immediatelyAfter = currentItem;
		}
		
		return Optional.empty();
	}
}
