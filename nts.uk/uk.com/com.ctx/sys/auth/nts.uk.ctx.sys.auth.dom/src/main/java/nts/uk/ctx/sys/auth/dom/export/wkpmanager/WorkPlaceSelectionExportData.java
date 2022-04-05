package nts.uk.ctx.sys.auth.dom.export.wkpmanager;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkPlaceSelectionExportData {
	// 職場コード
	private String workplaceCode;
	// 職場名称
	private String workplaceName;
	// 社員コード
	private String employeeCode;
	// ビジネスネーム
	private String businessName;
	// WorkplaceManager
	private GeneralDate startDate;
	private GeneralDate endDate;
	// 利用できる
	// private Integer availability;

	private Map<String, String> functionNo;
}
