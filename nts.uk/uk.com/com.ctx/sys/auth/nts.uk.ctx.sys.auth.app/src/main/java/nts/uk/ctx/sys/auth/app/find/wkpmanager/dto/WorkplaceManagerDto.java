package nts.uk.ctx.sys.auth.app.find.wkpmanager.dto;

import java.util.List;

import lombok.Data;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.wkpmanager.WorkplaceManager;
import nts.uk.ctx.sys.auth.dom.wkpmanager.dom.EmpBasicInfoImport;

@Data
public class WorkplaceManagerDto {
	/* 職場管理者ID */
	private String wkpManagerId;
	
	/* 社員ID */
	private String employeeId;
	
	private EmpBasicInfoImport employeeInfo;
	
	/* 職場ID */
	private String wkpId;
	
	/* 開始日 */
	private GeneralDate startDate;
	
	/* 終了日 */
	private GeneralDate endDate;
	
	
	private List<WorkplaceAuthorityDto> roleList;
	
	public WorkplaceManagerDto(String wkpManagerId, String employeeId, String wkpId, GeneralDate startDate,
			GeneralDate endDate) {
		super();
		this.wkpManagerId = wkpManagerId;
		this.employeeId = employeeId;
		this.wkpId = wkpId;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	
	public static WorkplaceManagerDto fromDomain(WorkplaceManager domain){
		return new WorkplaceManagerDto(
			domain.getWorkplaceManagerId(),
			domain.getEmployeeId(),
			domain.getWorkplaceId(),
			domain.getHistoryPeriod().start(),
			domain.getHistoryPeriod().end()
		);
	}
}
