package nts.uk.shr.infra.file.report.masterlist;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.SneakyThrows;
import nts.arc.layer.app.file.export.ExportService;
import nts.arc.layer.app.file.export.ExportServiceContext;
import nts.uk.shr.infra.file.report.masterlist.generator.MasterListReportGenerator;
import nts.uk.shr.infra.file.report.masterlist.webservice.MasterListExportQuery;

@Stateless
public class MasterListExportService extends ExportService<MasterListExportQuery> {

	@Inject
	private MasterListReportGenerator generator;
	
	@Override
	@SneakyThrows
	protected void handle(ExportServiceContext<MasterListExportQuery> context) {

		this.generator.generate(context.getGeneratorContext(), context.getQuery());
	}

}
