package nts.uk.ctx.sys.log.ws.datacorrectionlog;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.app.file.export.ExportServiceResult;
import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.log.app.find.datacorrectionlog.DataCorrectionLogDto;
import nts.uk.ctx.sys.log.app.find.datacorrectionlog.DataCorrectionLogFinder;
import nts.uk.ctx.sys.log.app.find.datacorrectionlog.DataCorrectionLogParams;
import nts.uk.ctx.sys.log.app.find.datacorrectionlog.exportcsv.DataCorrectionLogExportService;

/**
 * 
 * @author HungTT
 *
 */

@Path("ctx/sys/log/datacorrectionlog")
@Produces("application/json")
public class DataCorrectionLogWebService extends WebService {

	@Inject
	private DataCorrectionLogFinder finder;

	@Inject
	private DataCorrectionLogExportService exportService;

	@POST
	@Path("findAll")
	public List<DataCorrectionLogDto> findAll(DataCorrectionLogParams params) {
		return finder.getDataLog(params);
	}

	@POST
	@Path("exportCsv")
	public ExportServiceResult generate(DataCorrectionLogParams query) {
		return this.exportService.start(query);
	}
}
