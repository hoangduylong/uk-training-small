package nts.uk.ctx.bs.employee.app.command.workplace.group;

import java.util.List;

import lombok.Data;
import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupCode;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupName;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupType;
/**
 * 
 * @author phongtq
 *
 */
@Data
public class RegisterWorkplaceGroupCommand {
	
	@Getter
	private String wkpGrID;
	
	/** 職場グループコード */
	private String wkpGrCD;
	
	/** 職場グループ名称 */
	private String wkpGrName;
	
	/** 職場グループ種別 */
	private int wkpGrType;
	
	/** 職場IDリスト */
	private List<String> lstWKPID;
	
	public WorkplaceGroup toDomain(String CID) {
		return WorkplaceGroup.create(
				CID, 
				new WorkplaceGroupCode(wkpGrCD), 
				new WorkplaceGroupName(wkpGrName), 
				EnumAdaptor.valueOf(wkpGrType, WorkplaceGroupType.class));
	}
}
