package nts.uk.ctx.bs.employee.app.command.groupcommonmaster;

import java.util.List;

import lombok.Getter;

/**
 * 
 * @author sonnlb
 *
 */
@Getter
public class SaveGroupCommonMasterCommand {
	// 共通マスタID
	String commonMasterId;
	// 更新項目リスト
	List<String> masterItemIds;
}
