package nts.uk.shr.infra.file.report.masterlist.webservice;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.app.file.export.ExportServiceResult;
import nts.arc.layer.ws.WebService;
import nts.uk.shr.infra.file.report.masterlist.MasterListExportService;

@Path("/masterlist/report")
@Produces("application/json")
public class MasterListExpxortWebService extends WebService{

	@Inject
	private MasterListExportService exportService;
	
	@POST
	@Path("print")
	public ExportServiceResult generate(MasterListExportQuery query) {
		return this.exportService.start(query);
	}
}
