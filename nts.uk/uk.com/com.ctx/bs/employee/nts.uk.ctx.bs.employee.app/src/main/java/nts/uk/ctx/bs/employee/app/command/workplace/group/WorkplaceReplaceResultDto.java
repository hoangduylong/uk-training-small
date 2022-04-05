package nts.uk.ctx.bs.employee.app.command.workplace.group;

import java.util.Optional;

import lombok.Data;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplaceResult;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplacement;

@Data
public class WorkplaceReplaceResultDto {
	/** 処理結果 */
	private Integer workplaceReplacement;
	
	/** 所属済み職場グループID */
	private String wKPGRPID;
	
	private String wKPID;

	/** 永続化処理 */
	private AtomTask persistenceProcess;
	
	public WorkplaceReplaceResult toDomain() {
		WorkplaceReplacement workplaceRepla = WorkplaceReplacement.valueOf(workplaceReplacement);
		return new WorkplaceReplaceResult(workplaceRepla, Optional.ofNullable(wKPGRPID), Optional.ofNullable(persistenceProcess));
	}
	
	public static WorkplaceReplaceResultDto toDto(Integer workplaceReplacement, String wKPGRPID, AtomTask persistenceProcess) {
		return new WorkplaceReplaceResultDto(workplaceReplacement, wKPGRPID, persistenceProcess);
	}
	
	public static WorkplaceReplaceResultDto toDtoWithId(Integer workplaceReplacement, String wKPGRPID,String wKPID, AtomTask persistenceProcess) {
		return new WorkplaceReplaceResultDto(workplaceReplacement, wKPGRPID, wKPID, persistenceProcess);
	}

	public WorkplaceReplaceResultDto(Integer workplaceReplacement, String wKPGRPID, AtomTask persistenceProcess) {
		super();
		this.workplaceReplacement = workplaceReplacement;
		this.wKPGRPID = wKPGRPID;
		this.persistenceProcess = persistenceProcess;
	}

	public WorkplaceReplaceResultDto(Integer workplaceReplacement, String wKPGRPID, String wKPID,
			AtomTask persistenceProcess) {
		super();
		this.workplaceReplacement = workplaceReplacement;
		this.wKPGRPID = wKPGRPID;
		this.wKPID = wKPID;
		this.persistenceProcess = persistenceProcess;
	}
	
	
}
