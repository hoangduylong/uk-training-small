package nts.uk.shr.infra.file.report.masterlist.data;

public enum ColumnTextAlign {
	
//	BOTTOM (0),
	CENTER (1),
//	CENTER_ACROSS (2),
//	DISTRIBUTED (3),
	FILL (4),
//	GENERAL (5),
	JUSTIFY (6),
	LEFT (7),
	RIGHT (8);
//	TOP (9),
//	JUSTIFIED_LOW (10),
//	THAI_DISTRIBUTED (11);

	public final int value;
	
	private ColumnTextAlign(int value) {
		this.value = value;
	}
}
