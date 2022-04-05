package nts.uk.ctx.sys.portal.app.query.notice;

import java.util.List;

import lombok.Builder;
import lombok.Data;
import nts.uk.ctx.sys.portal.dom.notice.adapter.EmployeeInfoImport;
import nts.uk.ctx.sys.portal.dom.notice.adapter.WorkplaceInfoImport;

@Data
@Builder
public class NotificationCreated {
	
	/**
	 * 作成者の職場（職場ID、職場コード、職場表示名）
	 */
	private WorkplaceInfoImport workplaceInfo;
	
	/**
	 * ＜List＞対象職場（職場ID、職場コード、職場表示名）
	 */
	private List<WorkplaceInfoImport> targetWkps;
	
	/**
	 * ＜List＞対象社員（社員ID、社員コード、ビジネスネーム）
	 */
	private List<EmployeeInfoImport> targetEmps;
}
