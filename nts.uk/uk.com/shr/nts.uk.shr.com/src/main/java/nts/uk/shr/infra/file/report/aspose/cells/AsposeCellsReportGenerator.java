package nts.uk.shr.infra.file.report.aspose.cells;

import java.text.SimpleDateFormat;
import java.util.Date;

import nts.arc.layer.infra.file.export.FileGenerator;

public class AsposeCellsReportGenerator extends FileGenerator {

	public AsposeCellsReportContext createContext(String templateFileInResource) {
		AsposeCellsReportContext x =new AsposeCellsReportContext(this.getResourceAsStream(templateFileInResource));

		return x;
				
	}
	
	public AsposeCellsReportContext createContext(String templateFileInResource, String reportId) {

		return new AsposeCellsReportContext(this.getResourceAsStream(templateFileInResource), reportId);
	}
	
	public AsposeCellsReportContext createEmptyContext(String reportId) {

		return new AsposeCellsReportContext(reportId);
	}

	/**
	 * Gets the report name.
	 * Change from filename.extension to filename_yyyymmddhhss.extension.
	 * @param name the name
	 * @return the report name
	 */
	protected String getReportName(String name) {
		String fileName = name;
		String extension = "";
		if (name.contains(".")) {
			fileName = name.substring(0, name.lastIndexOf("."));
			extension = name.substring(name.lastIndexOf(".") + 1, name.length());
		}

		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

		return String.format("%s_%s.%s", fileName,
				sdf.format(new Date()),
				extension);

	}
	
}
