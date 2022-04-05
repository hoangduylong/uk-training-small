/**
 * 
 */
package nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo;

import javax.ejb.Stateless;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDateTime;

/**
 * domain 外国人在留履歴情報
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Stateless
public class ForeignerResidenceHistoryInforItem extends AggregateRoot {

	// 個人ID
	public String pid;

	// 交付年月日
	GeneralDateTime issueDate;

	// 履歴ID
	String hisId;

	// 在留資格_ID
	Long statusOfResidenceID;

	// 在留資格
	String statusOfResidenceCode;

	// 在留資格_名称
	String statusOfResidenceName;

	// 在留期間_ID
	Integer periodOfStayID;

	// 在留期間_コード
	String periodOfStayCode;

	// 在留期間_名称
	String periodOfStayName;

	// 在留許可番号
	String numberResidencePermit;

	// 資格外活動許可
	PerUnqualifiedActivity perUnqualifiedActivity;

	// 届出事業所外就労区分
	ReportWorkOutside reportWorkOutside;

	//国籍_ID
	Integer nationalityID;

	// 国籍_コード
	String nationality_Code;

	// 国籍_名称
	String nationality_Name;
	
}
