package nts.uk.shr.com.history.query;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.Value;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * 履歴データを一括して取得し、日ごとに問い合わせられるように保持するクラス
 *
 * @param <E>
 */
public class HistoryQueryContainer<E> {

	private final List<Item<E>> sortedItems;
	
	public HistoryQueryContainer(List<Item<E>> items) {
		this.sortedItems = items.stream().sorted().collect(Collectors.toList());
	}
	
	public static <E> Builder<E> builder(Class<E> historyItemClass) {
		return new Builder<>();
	}
	
	public static <E> HistoryQueryContainer<E> empty() {
		return new HistoryQueryContainer<>(Collections.emptyList());
	}
	
	public Optional<E> getAt(GeneralDate targetDate) {
		return this.sortedItems.stream()
				.filter(item -> item.period.contains(targetDate))
				.findFirst()
				.map(item -> item.historyItem);
	}
	
	public static class Builder<E> {
		private final List<Item<E>> items = new ArrayList<>();
		
		public Builder<E> add(DatePeriod period, E historyItem) {
			this.items.add(new Item<>(period, historyItem));
			return this;
		}
		
		public HistoryQueryContainer<E> build() {
			return new HistoryQueryContainer<>(this.items);
		}
	}
	
	@Value
	private static class Item<E> implements Comparable<Item<E>> {
		
		private final DatePeriod period;
		private final E historyItem;
		
		@Override
		public int compareTo(Item<E> other) {
			return this.period.start().compareTo(other.period.start());
		}
	}
}
