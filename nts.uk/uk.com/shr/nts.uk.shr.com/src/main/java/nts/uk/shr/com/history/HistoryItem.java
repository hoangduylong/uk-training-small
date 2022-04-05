package nts.uk.shr.com.history;

import lombok.val;
import nts.gul.util.value.DiscreteValue;
import nts.arc.time.calendar.period.GeneralPeriod;

/**
 * Item of history that has an own span.
 * This class should be an interface but equals(Object) can not be overridden.
 *
 * @param <S> Span
 */
public abstract class HistoryItem<S extends GeneralPeriod<S, D>, D extends Comparable<D> & DiscreteValue<D>> {

	/**
	 * Returns the own span.
	 * @return span
	 */
	public abstract S span();
	
	/**
	 * Returns start of own span.
	 * @return start
	 */
	public D start() {
		return this.span().start();
	}
	
	/**
	 * Returns end of own span.
	 * @return end
	 */
	public D end() {
		return this.span().end();
	}
	
	/**
	 * Returns string to identify: ID, code, ...
	 * @return identifier
	 */
	public abstract String identifier();
	
	/**
	 * Change span of this item.
	 * @param newSpan new span
	 */
	public abstract void changeSpan(S newSpan);

	/**
	 * Shorten start of this span, to accept a given span.
	 * @param spanToBeAccepted
	 */
	public void shortenStartToAccept(S spanToBeAccepted) {
		val newSpan = this.span().newSpan(spanToBeAccepted.endNext(true), this.span().end());
		this.changeSpan(newSpan);
	}
	
	/**
	 * Shorten start of this span, to accept a given span.
	 * @param spanToBeAccepted
	 */
	public void shortenEndToAccept(S spanToBeAccepted) {
		val newSpan = this.span().newSpan(this.span().start(), spanToBeAccepted.startNext(false));
		this.changeSpan(newSpan);
	}

	/**
	 * Shorten start of this span, to accept a given item.
	 * @param itemToBeAccepted item to be accepted
	 */
	public void shortenStartToAccept(HistoryItem<S, D> itemToBeAccepted) {
		this.shortenStartToAccept(itemToBeAccepted.span());
	}
	
	/**
	 * Shorten end of this span, to accept a given item.
	 * @param itemToBeAccepted item to be accepted
	 */
	public void shortenEndToAccept(HistoryItem<S, D> itemToBeAccepted) {
		this.shortenEndToAccept(itemToBeAccepted.span());
	}
	
	/**
	 * Returns true if same identifier.
	 * @param other item to be compared
	 * @return true if same identifier
	 */
	public boolean equals(HistoryItem<S, D> other) {
		return this.identifier().equals(other.identifier());
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public boolean equals(Object obj) {
		if (this == obj) return true;
		if (obj == null) return false;
		if (this.getClass() != obj.getClass()) return false;
		return this.equals((HistoryItem<S, D>)obj);
	}
	
	@Override
	public int hashCode() {
		return this.identifier().hashCode();
	}
}
