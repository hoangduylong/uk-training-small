package nts.uk.shr.infra.file.report.masterlist.webservice;

public enum MasterListMode {

	YEAR_RANGE(4, "年期間"),
	ALL(3, "フル"),
	FISCAL_YEAR_RANGE(2, "年度期間"),
	BASE_DATE(1, "基準日"),
	NONE(0, "なし");

	public final int value;
	
	public final String name;
	
	private MasterListMode(int value, String name) {
		this.value = value;
		this.name = name;
	}
}
