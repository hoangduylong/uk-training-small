package nts.uk.ctx.bs.employee.dom.employee.mgndata;

public enum EmployeeDeletionAttr {
	/** 0 - 削除していない **/
	NOTDELETED(0),
	/** 1 - 一時削除 **/
	TEMPDELETED(1),
	/** 2 - 完全削除 **/
	PURGEDELETED(2);

	public final int value;

	private EmployeeDeletionAttr(int value) {
		this.value = value;
	}

}
