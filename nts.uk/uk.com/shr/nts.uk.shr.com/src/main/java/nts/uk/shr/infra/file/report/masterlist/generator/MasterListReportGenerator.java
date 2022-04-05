package nts.uk.shr.infra.file.report.masterlist.generator;

import nts.arc.layer.infra.file.export.FileGeneratorContext;
import nts.uk.shr.infra.file.report.masterlist.webservice.MasterListExportQuery;

public interface MasterListReportGenerator {

	void generate(FileGeneratorContext generatorContext, MasterListExportQuery query);
}
