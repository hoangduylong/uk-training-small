package nts.uk.shr.com.enumcommon;

public enum DayAttr {

	
	THE_PREVIOUS_DAY(0, "", "前日", -24),
	THE_PRESENT_DAY(1, "", "当日", 0),
	THE_NEXT_DAY(2, "", "翌日", 24),
	TWO_DAY_LATER(3, "", "翌々日", 24 * 2),
	TWO_DAY_EARLIER(4, "", "前々日", -24 * 2);

	public final int value;
	
	public final String nameId;
	
	public final String description;
	
	public final int hours;
	
	private DayAttr(int value, String nameId, String description, int hours) {
		this.value = value;
		this.nameId = nameId;
		this.description = description;
		this.hours = hours;
	}
}
