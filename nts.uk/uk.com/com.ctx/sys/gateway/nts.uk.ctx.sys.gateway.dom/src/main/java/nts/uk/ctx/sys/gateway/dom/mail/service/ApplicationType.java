package nts.uk.ctx.sys.gateway.dom.mail.service;

/**
 * @author hiep.ld
 *
 */
public enum ApplicationType {
	/** 残業申請*/
	OVER_TIME_APPLICATION(0,"残業申請"),
	/** 休暇申請*/
	ABSENCE_APPLICATION(1,"休暇申請"),
	/** 勤務変更申請*/
	WORK_CHANGE_APPLICATION(2,"勤務変更申請"),
	/** 出張申請*/
	BUSINESS_TRIP_APPLICATION(3,"出張申請"),
	/** 直行直帰申請*/
	GO_RETURN_DIRECTLY_APPLICATION(4,"直行直帰申請"),
	/** 休出時間申請*/
	BREAK_TIME_APPLICATION(6,"休出時間申請"),
	/** 打刻申請*/
	STAMP_APPLICATION(7,"打刻申請"),
	/** 時間年休申請*/
	ANNUAL_HOLIDAY_APPLICATION(8,"時間年休申請"),
	/** 遅刻早退取消申請*/
	EARLY_LEAVE_CANCEL_APPLICATION(9,"遅刻早退取消申請"),
	/** 振休振出申請*/
	COMPLEMENT_LEAVE_APPLICATION(10,"振休振出申請"),
	/** 打刻申請（NR形式）*/
	STAMP_NR_APPLICATION(11,"打刻申請（NR形式）"),
	/** 連続出張申請*/
	LONG_BUSINESS_TRIP_APPLICATION(12,"連続出張申請"),
	/** 出張申請オフィスヘルパー*/
	BUSINESS_TRIP_APPLICATION_OFFICE_HELPER(13,"出張申請オフィスヘルパー"),
	/** ３６協定時間申請*/
	APPLICATION_36(14,"３６協定時間申請"),
	/** 15: 任意項目申請*/
	OPTIONAL_ITEM_APPLICATION(15, "任意項目申請");
	 
	public int value;
	
	public String nameId;
	ApplicationType(int type,String nameId){
		this.value = type;
		this.nameId = nameId;
	}
}

