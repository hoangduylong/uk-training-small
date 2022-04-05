package nts.uk.ctx.bs.employee.dom.temporaryabsence;

public enum TempAbsenceType {
	//休職 Temporary leave
	TEMP_LEAVE(1),
	//介護休業 NursingCareLeave
	NURSING_CARE_LEAVE(2),
	//育児介護 ChildCareNursing
	CHILD_CARE_NURSING(3),
	//産前休業 prior childbirth
	PRIOR_CHILDBIRTH(4),
	//産後休業 AfterChildbirth
	AFTER_CHILDBIRTH(5);
	
	public int value;
	TempAbsenceType(int value){
		this.value = value;
	}
	
}
