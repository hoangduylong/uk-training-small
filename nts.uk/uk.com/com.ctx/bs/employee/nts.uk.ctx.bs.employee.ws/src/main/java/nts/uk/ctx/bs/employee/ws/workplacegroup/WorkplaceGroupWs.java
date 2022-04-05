package nts.uk.ctx.bs.employee.ws.workplacegroup;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.app.command.hospitalofficeinfo.*;
import nts.uk.ctx.bs.employee.app.command.workplace.group.*;
import nts.uk.ctx.bs.employee.app.find.employeeinfo.workplacegroup.*;
import nts.uk.ctx.bs.employee.app.query.hospitalofficeinfo.*;
import nts.uk.ctx.bs.employee.dom.workplace.master.service.WorkplaceInforParam;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * @author anhdt
 */
@Path("bs/schedule/employeeinfo/workplacegroup")
@Produces(MediaType.APPLICATION_JSON)
public class WorkplaceGroupWs extends WebService {

    @Inject
    private WorkplaceGroupFinder wkpGroupFinder;

    @Inject
    private RegisterWorkplaceGroupCommandHandler registerWkpGroupCmd;

    @Inject
    private UpdateWorkplaceGroupCommandHandler updateWkpGroupCmd;

    @Inject
    private DeleteWorkplaceGroupCommandHandler deletewkpGroupCmd;

    @Inject
    private AffWorkplaceGroupEmployeeQuery workplaceGroupEmployeeQuery;

    @Inject
    private GetOptionInformationQuery getOptionInformationQuery;

    @Inject
    private RegistOfNightShiftInforCommandHandler registOfNightShiftInforCommandHandler;

    @Inject
    private GetNightShiftInformationQuery getNightShiftInformationQuery;

    @Inject
    private GetAListOfNightShiftHistoryQuery getAListOfNightShiftHistoryQuery;

    @Inject
    private AddHospitalBusinessOfficeHistCommandHandler addHospitalCommandHandler;

    @Inject
    private DeleteHospitalBusinessOfficeHistCommandHandler deleteHospitalCommandHandler;

    @Inject
    private UpdateHospitalBusinessOfficeHistCommandHandler updateHospitalCommandHandler;

    @Inject
    private AcquireWardOfficeInfoReferenceQuery acquireWardOfficeInfoReferenceQuery;

    /**
     * Get all team setting
     *
     * @return list
     */
    @POST
    @Path("getAll")
    public WorkplaceGroupDto getWorkplaceGroup() {
        return wkpGroupFinder.getWorkplaceGroup();
    }

    @POST
    @Path("getListWorkplaceId/{id}")
    public List<String> getListWplId(@PathParam("id") String WKPGRPID) {
        return wkpGroupFinder.getLstWorkplaceId(WKPGRPID);
    }

    @POST
    @Path("getWorkplaceGroup/{id}")
    public WorkplaceGroupDto getWorkplace(@PathParam("id") String WKPGRPID) {
        return wkpGroupFinder.getWkplaceGroup(WKPGRPID);
    }

    @POST
    @Path("getWorkplaceInfo")
    public List<WorkplaceInforParam> getWorkplaceInfo(WorkplaceInfoRequest request) {
        return wkpGroupFinder.getWorkplaceInfo(request.getWorkplaceIds(), request.toDate());
    }

    @POST
    @Path("registerWorkplaceGroup")
    public ResWorkplaceGroupResult registerWorkplaceGroup(RegisterWorkplaceGroupCommand command) {
        return registerWkpGroupCmd.handle(command);
    }

    @POST
    @Path("updateWorkplaceGroup")
    public ResWorkplaceGroupResult updateWorkplaceGroup(RegisterWorkplaceGroupCommand command) {
        return updateWkpGroupCmd.handle(command);
    }

    @POST
    @Path("deleteWorkplaceGroup")
    public void deleteWorkplaceGroup(DeleteWorkplaceGroupCommand command) {
        deletewkpGroupCmd.handle(command);
    }


    @POST
    @Path("workplacegroupemployee")
    public AffWorkplaceGroupDto getWorkplaceGroupEmployee(DateRequest date) {
        return workplaceGroupEmployeeQuery.getWorkplaceGroupOfEmployee(date.toDate());
    }

    /**
     *  Update KSM007 TODO CHINH.HM
     */
    // A
    @POST
    @Path("optioninformation")
    public OptionInforDto getOptionInfor() {
        return getOptionInformationQuery.getInfor();
    }

    @POST
    @Path("getnightshiftinfor")
    public HospitalBusinessOfficeInfoDto getNightShiftInfor(DateAndWplIdDto request) {
        return acquireWardOfficeInfoReferenceQuery
                .getHospitalBusinessOfficeInfo(request.getWorkplaceGroupId());
    }

    //B INIT SCREEN
    @POST
    @Path("getnightshiftinformation")
    public HospitalBusinessOfficeInfoDto getNightShiftInformation(PramsDto prams) {
        return getNightShiftInformationQuery.getHospitalBusinessOfficeInfo(prams.getId());
    }
    //B
    @POST
    @Path("getlistnightshiftinforhist")
    public List<HospitalBusinessOfficeInfoHistoryDto> getHospitalBusinessOfficeInfo(PramsDto prams) {
        return getAListOfNightShiftHistoryQuery.getHospitalBusinessHistory(prams.getId());
    }

    //B
    @POST
    @Path("addnightshiftinfor")
    public void addHospitalBusinessOfficeHist(RegistOfNightShiftInforCommand command) {
        registOfNightShiftInforCommandHandler.handle(command);
    }
    //C
    @POST
    @Path("addhospitalbusinessofficehist")
    public void addHospitalBusinessOfficeHist(AddHospitalBusinessOfficeHistCommand command) {
        addHospitalCommandHandler.handle(command);
    }

    //D
    @POST
    @Path("deletehospitalbusinessofficehist")
    public void deleteHospitalBusinessOfficeHist(DeleteHospitalBusinessOfficeHistCommand command) {
        deleteHospitalCommandHandler.handle(command);
    }

    //D
    @POST
    @Path("updatehospitalbusinessofficehist")
    public void updateHospitalBusinessOfficeHist(UpdateHospitalBusinessOfficeHistCommand command) {
        updateHospitalCommandHandler.handle(command);
    }

}

