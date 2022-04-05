package nts.uk.ctx.bs.employee.pub.employee.workplace.export;

import lombok.AllArgsConstructor;
import lombok.Getter;
/**
 * 職場グループExported										
 * @author HieuLt
 */
@Getter
@AllArgsConstructor
public class WorkplaceGroupExport {
	/** 職場グループID **/
	private String workplaceGroupId;
	/** 職場グループコード **/ 
	private String workplaceGroupCode;
	/** 職場グループ名称 **/
	private String workplaceName;
	/** 職場グループ種別**/
	private int workplaceGroupType;
	
}
