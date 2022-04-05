package nts.uk.ctx.sys.gateway.dom.mail.service;

/**
 * 埋込URL期間区分
 * @author hiep.ld
 *
 */
public enum PeriodClassification {
	/** 年 */
	YEAR (0),
	
	/** 月 */
	MONTH (1),
	
	/** 日 */
	DAY (2),
	
	/** 時 */
	HOUR (3),
	
	/** 分 */
	MINUTE (4);
	
	public int value;
	
	private PeriodClassification (int rawValue){
		this.value = rawValue;
	}
}
