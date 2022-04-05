package nts.uk.ctx.bs.employee.ws.test;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.bs.employee.dom.foreigner.residence.hisinfo.EmpForeignerResidenceManagement;
import nts.uk.ctx.bs.employee.dom.foreigner.residence.hisinfo.EmpForeignerResidenceServices;
import nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo.ForeignerResidenceHistoryInforItem;

@Path("empresidencehistory")
@Produces(MediaType.APPLICATION_JSON)
public class EmpForeignerResidenceWS {

	@Inject
	private EmpForeignerResidenceServices empforeignerResidenceServices;

	@POST
	@Path("/get1") // test service
	public EmpForeignerResidenceManagement getList(ParamTest param) {

		List<String> listSid = param.listSid;
		GeneralDateTime baseDate = GeneralDateTime.legacyDateTime(param.baseDate.date()).addMonths(-1);

		EmpForeignerResidenceManagement foreignerResidenceMng = new EmpForeignerResidenceManagement();

		foreignerResidenceMng = empforeignerResidenceServices.loadForeignerResidence(listSid, baseDate,
				foreignerResidenceMng);
		return foreignerResidenceMng;

	}
	
	@POST
	@Path("/get2") // test service
	public ForeignerResidenceHistoryInforItem getSingle(ParamTest param) {

		List<String> listPid = param.listSid;
		String pid = param.sid;
		GeneralDateTime baseDate = GeneralDateTime.legacyDateTime(param.baseDate.date()).addMonths(-1);

		EmpForeignerResidenceManagement foreignerResidenceMng = new EmpForeignerResidenceManagement();

		foreignerResidenceMng  = empforeignerResidenceServices.loadForeignerResidence(listPid, baseDate, foreignerResidenceMng);
		
		ForeignerResidenceHistoryInforItem mItem1 = empforeignerResidenceServices.getForeignerResidence(pid, baseDate, foreignerResidenceMng);
		
		return mItem1;
	}
}
