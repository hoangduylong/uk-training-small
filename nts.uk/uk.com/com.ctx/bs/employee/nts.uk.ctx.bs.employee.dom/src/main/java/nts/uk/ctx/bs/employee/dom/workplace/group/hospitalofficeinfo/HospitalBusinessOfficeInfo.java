package nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.objecttype.DomainAggregate;
/**
 * 病棟・事業所情報	
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.病棟・事業所情報.病棟・事業所情報
 * @author lan_lt
 *
 */
@Getter
@AllArgsConstructor
public class HospitalBusinessOfficeInfo implements DomainAggregate{
	/** 職場グループID */
	private final String workplaceGroupId;
	
	/** 履歴ID */
	private final String historyId;
	
	/** 夜勤運用ルール */
	private NightShiftOperationRule nightShiftOpeRule;
	
	/** 介護事業所情報 */
	private Optional<NursingCareEstablishmentInfo> nursingCareEstInfo;

}
