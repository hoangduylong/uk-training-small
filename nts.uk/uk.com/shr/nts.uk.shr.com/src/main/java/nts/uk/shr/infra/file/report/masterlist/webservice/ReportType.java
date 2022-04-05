package nts.uk.shr.infra.file.report.masterlist.webservice;

public enum ReportType {

	EXCEL(0, "EXCEL"),
	PDF(1, "PDF"),
	CSV(3, "CSV");

	public final int value;
	
	public final String name;
	
	private ReportType(int value, String name) {
		this.value = value;
		this.name = name;
	}
}
