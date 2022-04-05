package nts.uk.shr.com.history;

import nts.gul.util.range.ComparableRange;
import nts.gul.util.value.DiscreteValue;
import nts.arc.time.calendar.period.GeneralPeriod;

public abstract class GeneralHistoryItem<S extends GeneralHistoryItem<S, R, T>,
		R extends GeneralPeriod<R, T>,
		T extends Comparable<T> & DiscreteValue<T>>
		extends HistoryItem<R, T> 
		implements ComparableRange<R, T> {

	private final String historyId;
	private R span;
	
	public GeneralHistoryItem(String historyId, R span) {
		this.historyId = historyId;
		this.span = span;
	}

	@Override
	public T start() {
		return this.span.start();
	}

	@Override
	public T end() {
		return this.span.end();
	}

	@Override
	public T startNext(boolean isIncrement) {
		return this.span.startNext(isIncrement);
	}

	@Override
	public T endNext(boolean isIncrement) {
		return this.span.endNext(isIncrement);
	}

	@Override
	public R newSpan(T newStart, T newEnd) {
		return this.span().newSpan(newStart, newEnd);
	}

	@Override
	public R span() {
		return this.span;
	}

	@Override
	public String identifier() {
		return this.historyId;
	}

	@Override
	public void changeSpan(R newSpan) {
		this.span = newSpan;
	}
}
