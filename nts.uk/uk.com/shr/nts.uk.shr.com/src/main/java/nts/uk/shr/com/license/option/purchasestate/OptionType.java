package nts.uk.shr.com.license.option.purchasestate;

import java.util.Arrays;

/**
 * オプションの種類
 * @author ai_muto
 *
 */
public enum OptionType {
	/* subsystem */
	humanResource(0),
	payroll(1),
	attendance(2),
	mobile(3),
	/* extended operation */
	smile(4),
	externalIO(5),
	multipleCompanies(6),
	/* attendance operation */
	/** Web打刻 */
	webTimeStamp(7),
	/** 工数・作業管理 */
	workload(8),
	/** 在席・伝言 */
	presentAndMessage(9),
	/** 時間休暇 */
	hourlyPaidLeave(10),
	/** 申請承認 */
	application(11),
	/** 入門・退門 */
	enterAndExit(12),
	/** 任意期間集計 */
	anyPeriodAggregation(13),
	/** アラームリスト */
	alarmList(14),
	/** 複数回・臨時勤務 */
	 multipleWork(15),
	/** 予約 */
	reservation(16),
	/** スケジュール */
	schedule(17),
	/** 医療 */
	medical(18),
	/** 介護 */
	nursing(19);

	private int checkDigitNo;

	private OptionType (int checkDigitNo) {
		this.checkDigitNo = checkDigitNo;
	}

	public int checkDigitNo () {
		return this.checkDigitNo;
	}

	public static int maxCheckDigitNo() {
		return
			Arrays.stream(OptionType.values())
				.max((ot1, ot2) -> Integer.compare(ot1.checkDigitNo(), ot2.checkDigitNo()))
			.get()
			.checkDigitNo();
	}

	public static OptionType parse(int checkDigitNo) {
		for (OptionType ot : OptionType.values()) {
			if(ot.checkDigitNo() == checkDigitNo) return ot;
		}

		throw new IllegalArgumentException();
	}

}
