package nts.uk.ctx.bs.employee.ws.temporaryabsence.frame;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.app.command.temporaryabsence.frame.RegisterTempAbsenceFrameCommand;
import nts.uk.ctx.bs.employee.app.command.temporaryabsence.frame.RegisterTempAbsenceFrameCommandHandler;
import nts.uk.ctx.bs.employee.app.find.temporaryabsence.dto.TempAbsenceFrameDto;
import nts.uk.ctx.bs.employee.app.find.temporaryabsence.frame.TempAbsenceFrameFinder;

@Path("bs/employee/temporaryabsence/frame")
@Produces(MediaType.APPLICATION_JSON)
public class TempAbsenceFrameWebService extends WebService{

	@Inject
	private TempAbsenceFrameFinder tafFinder;
	
	@Inject
	private RegisterTempAbsenceFrameCommandHandler rtafCommand;
	
	@Path("findTempAbsenceFrameByCId")
	@POST
	public List<TempAbsenceFrameDto> getTempAbsenceFrameByCId() {
		return tafFinder.findByCid();
	}
	
	@Path("findTempAbsenceFrameByCIdAndFrameNo")
	@POST
	public TempAbsenceFrameDto getTempAbsenceFrameByCIdAndFrameNo(String cId, short tempAbsenceFrameNo) {
		return tafFinder.findByTAFPk(cId, tempAbsenceFrameNo);
	}
	
	@Path("updateTempAbsenceFrameByCidAndFrameNo")
	@POST
	public void updateTempAbsenceFrame(RegisterTempAbsenceFrameCommand dto) {
		this.rtafCommand.handle(dto);
		
	}
	
	
}
