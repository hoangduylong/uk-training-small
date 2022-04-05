package nts.uk.ctx.bs.employee.dom.temporaryabsence.state;

public enum LeaveHolidayType {
	
	// 休職
	LEAVE_OF_ABSENCE(1),
	// 産前休業
	MIDWEEK_CLOSURE(2),
	// 産後休業
	AFTER_CHILDBIRTH(3),
	// 育児介護
	CHILD_CARE_NURSING(4),
	// 介護休業
	NURSING_CARE_LEAVE(5),
	// 傷病休業
	SICK_LEAVE(6),
	// 任意休業
	ANY_LEAVE(7);
	
	public int value;

	LeaveHolidayType(int value) {
		this.value = value;
	}

}
