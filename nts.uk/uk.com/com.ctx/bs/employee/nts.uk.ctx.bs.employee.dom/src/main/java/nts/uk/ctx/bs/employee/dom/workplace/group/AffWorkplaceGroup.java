package nts.uk.ctx.bs.employee.dom.workplace.group;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.objecttype.DomainAggregate;

/**
 * 職場グループ所属情報
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.職場グループ所属情報
 * @author phongtq
 */
@Getter
@AllArgsConstructor
public class AffWorkplaceGroup implements DomainAggregate {

	/** 職場グループID **/
	private final String workplaceGroupId;

	/** 職場ID **/
	private String workplaceId;

}
