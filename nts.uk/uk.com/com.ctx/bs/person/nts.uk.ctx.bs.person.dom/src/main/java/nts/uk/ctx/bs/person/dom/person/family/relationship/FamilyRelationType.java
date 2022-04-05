package nts.uk.ctx.bs.person.dom.person.family.relationship;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * 家族続柄種類
 * @author lanlt
 *
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FamilyRelationType extends AggregateRoot{
	//契約コード
	private ContractCode contractCd;
	
	//家族続柄コード
	private RelationShipCode relationShipCode;
	
	//家族続柄名称
	private RelationShipName relationShipName;
	
	//配偶者区分
	private boolean isSpouse;
	
	//子ども区分
	private boolean isChild;
	
	public static FamilyRelationType createFromJavaType(String  contractCd,
			String relationShipCode, String relationShipName, boolean isSpouse, boolean isChild) {
		return new FamilyRelationType(new ContractCode(contractCd),
				new RelationShipCode(relationShipCode),
				new RelationShipName(relationShipName),
				isSpouse,
				isChild);
	}
	
	
	

}
