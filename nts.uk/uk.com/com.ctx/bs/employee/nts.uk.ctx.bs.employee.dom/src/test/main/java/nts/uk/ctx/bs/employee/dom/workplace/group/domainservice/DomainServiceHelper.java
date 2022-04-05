package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import nts.arc.enums.EnumAdaptor;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupCode;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupName;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupType;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplaceResult;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplacement;

public class DomainServiceHelper {
	public static class Helper {
		// String wKPGRPID = "000000000000000000000000000000000011";
		// String cID = AppContexts.user().companyId();
		// String wKPGRPCode = "0000000001";
		// String wKPGRPName = "00000000000000000011";
		// String wKPID = "000000000000000000000000000000000011";
		int wKPGRPType = 1;
		public static WorkplaceGroup DUMMY = new WorkplaceGroup(
				"000000000000000000000000000000000011", 
				"00000000000001", 
				new WorkplaceGroupCode("0000000001"), 
				new WorkplaceGroupName("00000000000000000011"), 
				EnumAdaptor.valueOf(1, WorkplaceGroupType.class));
		
		AffWorkplaceGroup affWorkplaceGroup = new AffWorkplaceGroup(
				"000000000000000000000000000000000011",
				"000000000000000000000000000000000011");
		
	}
	
	public static List<AffWorkplaceGroup> getHelper() {
		String wKPID = "000000000000000000000000000000000011";
		String wKPGRPID = "00000000000001";
		List<AffWorkplaceGroup> workplaceGroup = Arrays.asList(new AffWorkplaceGroup(wKPGRPID, wKPID),
				new AffWorkplaceGroup("00000000000002", "000000000000000000000000000000000011"),
				new AffWorkplaceGroup("00000000000003", "000000000000000000000000000000000012"),
				new AffWorkplaceGroup("00000000000004", "000000000000000000000000000000000013"));
		
		return workplaceGroup;
	}
	
	public static List<WorkplaceInfoImport> getLstWpII(){
		String wKPID = "000000000000000000000000000000000011";
		List<WorkplaceInfoImport> lstInfoImports = Arrays.asList(new WorkplaceInfoImport(wKPID, "HierarchyCode", "WorkplaceCode", "WorkplaceName", "DisplayName", "GenericName", "ExternalCode"),
				new WorkplaceInfoImport(wKPID, "HierarchyCode", "WorkplaceCode", "WorkplaceName", "DisplayName", "GenericName", "ExternalCode"),
				new WorkplaceInfoImport(wKPID, "HierarchyCode", "WorkplaceCode", "WorkplaceName", "DisplayName", "GenericName", "ExternalCode"),
				new WorkplaceInfoImport(wKPID, "HierarchyCode", "WorkplaceCode", "WorkplaceName", "DisplayName", "GenericName", "ExternalCode"));
		
		return lstInfoImports;
	}
	
	public static List<WorkplaceInfoImport> getLstWpIISecond(){
		String wKPID = "000000000000000000000000000000000012";
		List<WorkplaceInfoImport> lstInfoImports = Arrays.asList(new WorkplaceInfoImport(wKPID, "HierarchyCode1", "WorkplaceCode", "WorkplaceName", "DisplayName", "GenericName", "ExternalCode"),
				new WorkplaceInfoImport(wKPID, "HierarchyCode1", "WorkplaceCode", "WorkplaceName", "DisplayName", "GenericName", "ExternalCode"),
				new WorkplaceInfoImport(wKPID, "HierarchyCode1", "WorkplaceCode", "WorkplaceName", "DisplayName", "GenericName", "ExternalCode"),
				new WorkplaceInfoImport(wKPID, "HierarchyCode1", "WorkplaceCode", "WorkplaceName", "DisplayName", "GenericName", "ExternalCode"));
		
		return lstInfoImports;
	}
	
	public static WorkplaceReplaceResult getWorkplaceReplaceResultDefault(int i) {
		return new WorkplaceReplaceResult(EnumAdaptor.valueOf(i, WorkplaceReplacement.class)
				, Optional.of(AtomTask.of(() -> {
		})));
	}
	
	public static List<String> getLstId(){
		List<String> lstWorkplaceId = Arrays.asList("000000000000000000000000000000000012", "000000000000000000000000000000000011", "000000000000000000000000000000000010");
		return lstWorkplaceId;
	}
	
}
