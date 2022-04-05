package nts.uk.ctx.bs.employee.pub.workplace.workplacegroup.hospitalofficeinfo;

import java.util.List;

import lombok.Value;

/**
 * 病棟情報Exported
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.病棟・事業所情報.Export.病棟・事業所情報Publish.病棟情報Exported
 * @author kumiko_otake
 */
@Value
public class HospitalWardInfoExport {

	/** 職場グループID **/
	private String workgroupPlaceId;
	/** 夜勤運用状態 **/
	private HospitalWardNightShiftOperationStatus status;
	/** 夜勤運用ルール履歴 **/
	private List<HospitalWardNishgShiftOperationRuleExport> historyItems;

}
