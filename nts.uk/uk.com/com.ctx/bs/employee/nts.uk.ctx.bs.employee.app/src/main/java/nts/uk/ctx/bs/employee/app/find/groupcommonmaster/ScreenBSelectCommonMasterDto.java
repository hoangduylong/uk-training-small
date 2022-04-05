package nts.uk.ctx.bs.employee.app.find.groupcommonmaster;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 
 * @author yennth
 *
 */
@NoArgsConstructor
@Data
public class ScreenBSelectCommonMasterDto {
	
	// 共通マスタID
	private String commonMasterId;
	
	private List<CommonMasterItemDto> listCommonMasterItem;

	public ScreenBSelectCommonMasterDto(String commonMasterId, List<CommonMasterItemDto> listCommonMasterItem) {
		super();
		this.commonMasterId = commonMasterId;
		this.listCommonMasterItem = listCommonMasterItem;
	}
	
}
