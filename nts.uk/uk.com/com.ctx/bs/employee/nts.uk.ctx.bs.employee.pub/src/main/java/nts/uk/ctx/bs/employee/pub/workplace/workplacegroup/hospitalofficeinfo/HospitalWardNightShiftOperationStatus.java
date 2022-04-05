package nts.uk.ctx.bs.employee.pub.workplace.workplacegroup.hospitalofficeinfo;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 病棟夜勤運用状態
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.病棟・事業所情報.Export.病棟・事業所情報Publish.病棟夜勤運用状態
 * @author kumiko_otake
 */
@Getter
@AllArgsConstructor
public enum HospitalWardNightShiftOperationStatus {

	/** 正常 **/
	NORMALLY(0),
	/** 病棟ではない **/
	NOT_HOSPITALWARD(1),
	/** 履歴なし **/
	NO_HISTORYITEM(2),
	;

	private final int value;

}
