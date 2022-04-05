package nts.uk.ctx.sys.auth.app.find.wplmanagementauthority.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceFunction;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WorkPlaceFunctionDto {
	/**
	 * NO
	 */
	private int functionNo;
	
	/**
	 * 初期値
	 */
	private boolean initialValue;

	/**
	 * 表示名
	 */
	private String displayName;

	/**
	 * 表示順
	 */
	private int displayOrder;
	
	/**
	 * 説明文
	 */
	private String description;
	
	public static WorkPlaceFunctionDto fromDomain(WorkPlaceFunction domain) {
		return new WorkPlaceFunctionDto(
				domain.getFunctionNo().v(),
				domain.isInitialValue(),
				domain.getDisplayName().v(),
				domain.getDisplayOrder(),
				domain.getDescription().v()
				);
	}
}
