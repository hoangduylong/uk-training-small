package nts.uk.ctx.bs.employee.app.find.employment.dto;

import java.util.List;

import lombok.Data;

@Data
public class GroupCommonMasterImport {

		// 共通マスタ名
		private String commonMasterName;

		// 共通マスタ項目
		private List<CommonMaterItemDto> commonMasterItems;

		@Override
		public String toString() {
			return "GroupCommonMasterImport [commonMasterName=" + commonMasterName + ", commonMasterItems="
					+ commonMasterItems + "]";
		}
}
