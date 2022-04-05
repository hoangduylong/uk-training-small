package nts.uk.ctx.bs.person.ws.test;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo.ForeignerResidenceHistoryInforItem;
import nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo.ForeignerResidenceManagement;
import nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo.ForeignerResidenceServices;

@Path("residencehistory")
@Produces(MediaType.APPLICATION_JSON)
public class ResidenceHistoryWS {

	@Inject
	private ForeignerResidenceServices foreignerResidenceServices;

	@POST
	@Path("/get1") // test service
	public ForeignerResidenceManagement getList(ParamTest param) {

		List<String> listPid = param.listPid;
		GeneralDateTime baseDate = GeneralDateTime.legacyDateTime(param.baseDate.date()).addMonths(-1);

		ForeignerResidenceManagement foreignerResidenceMng = new ForeignerResidenceManagement();

		foreignerResidenceMng = foreignerResidenceServices.loadForeignerResidence(listPid, baseDate,
				foreignerResidenceMng);
		return foreignerResidenceMng;

	}
	
	@POST
	@Path("/get2") // test service
	public ForeignerResidenceHistoryInforItem getSingle(ParamTest param) {

		List<String> listPid = param.listPid;
		String pid = param.pid;
		GeneralDateTime baseDate = GeneralDateTime.legacyDateTime(param.baseDate.date()).addMonths(-1);

		ForeignerResidenceManagement foreignerResidenceMng = new ForeignerResidenceManagement();

		foreignerResidenceMng  = foreignerResidenceServices.loadForeignerResidence(listPid, baseDate, foreignerResidenceMng);
		
		ForeignerResidenceHistoryInforItem mItem1 = foreignerResidenceServices.getForeignerResidence(pid, baseDate, foreignerResidenceMng);
		
		return mItem1;
	}
}
