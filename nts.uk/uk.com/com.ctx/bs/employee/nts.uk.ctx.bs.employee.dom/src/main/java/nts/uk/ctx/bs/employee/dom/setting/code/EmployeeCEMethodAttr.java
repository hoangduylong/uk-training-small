package nts.uk.ctx.bs.employee.dom.setting.code;

/*
 * 社員コード編集方法
 */
public enum EmployeeCEMethodAttr {
	/** 0 - 前ゼロ **/
	ZEROBEFORE(0),
	/** 1 - 後ゼロ **/
	ZEROAFTER(1),
	/** 2 - 前スペース **/
	SPACEBEFORE(2),
	/** 3 - 後スペース **/
	SPACEAFTER(3);

	public final int value;

	private EmployeeCEMethodAttr(int value) {
		this.value = value;
	}
}
