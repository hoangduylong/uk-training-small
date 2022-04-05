package nts.uk.ctx.bs.person.dom.person.deletemanagement;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.layer.dom.AggregateRoot;

/**
 * The Class Delete Person Management - 個人情報削除管理
 */

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PersonDeleteManagement extends AggregateRoot{
	
	/** The recordId - レコードID*/
	private String recordId;
	
	/** The Person Info Category ID - 個人情報カテゴリID*/
	private String personInfoCtgId;
	
	public static PersonDeleteManagement createFromJavaType(String recordId, String personInfoCtgId) {
		return new PersonDeleteManagement(recordId,personInfoCtgId);
	}

}
