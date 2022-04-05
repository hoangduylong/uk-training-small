package nts.uk.shr.infra.file.csv;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.file.export.ExportService;
import nts.arc.layer.app.file.export.ExportServiceContext;

@Stateless
public class CSVExportService extends ExportService<CSVFileData>{
	
	@Inject
	private CSVReportGenerator generator;

	@Override
	protected void handle(ExportServiceContext<CSVFileData> context) {
		
		CSVFileData data = context.getQuery();
		
		this.generator.generate(context.getGeneratorContext(), data);
	}
	
}
