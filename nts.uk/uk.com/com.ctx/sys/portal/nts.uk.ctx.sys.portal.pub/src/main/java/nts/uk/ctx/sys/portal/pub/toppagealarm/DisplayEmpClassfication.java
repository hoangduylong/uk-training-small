package nts.uk.ctx.sys.portal.pub.toppagealarm;

public enum DisplayEmpClassfication {
	/** 本人 */
	PRINCIPAL(0),
	
	/** 上長 */
	SUPERIOR(1),
	
	/** 担当者 */
	PIC(2);

	public final int value;

	private DisplayEmpClassfication(int type) {
		this.value = type;
	}
}
