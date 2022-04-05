package nts.uk.ctx.bs.employee.app.command.workplace.group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkplaceGroupResultDto {
	/** 職場グループコード */
	private String WKPGRPCode;
	
	/** 職場グループ名称 */
	private String WKPGRPName; 
	
	public WorkplaceGroupResultDto toDto(String code, String name) {
		return new WorkplaceGroupResultDto(code, name);
	}
}
