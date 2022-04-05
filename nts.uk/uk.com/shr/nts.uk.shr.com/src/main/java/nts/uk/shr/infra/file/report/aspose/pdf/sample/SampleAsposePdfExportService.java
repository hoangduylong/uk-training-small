package nts.uk.shr.infra.file.report.aspose.pdf.sample;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.file.export.ExportService;
import nts.arc.layer.app.file.export.ExportServiceContext;

@Stateless
public class SampleAsposePdfExportService extends ExportService<Object> {

	@Inject
	private SampleAsposePdfReportGenerator generator;
	
	@Override
	protected void handle(ExportServiceContext<Object> context) {
		generator.generate(context.getGeneratorContext());
	}

}
