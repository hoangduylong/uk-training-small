package nts.uk.ctx.bs.employee.dom.groupcommonmaster;

import java.util.List;

import lombok.NoArgsConstructor;

import lombok.AllArgsConstructor;

import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupCommonMasterExportDto {

	// 共通マスタ名
	private String commonMasterName;

	// 共通マスタ項目

	private List<GroupCommonMasterItem> commonMasterItems;

	public GroupCommonMasterExportDto(String commonMasterName) {
		this.commonMasterName = commonMasterName;
	}
}
