/**
 * 
 */
package nts.uk.ctx.bs.employee.app.find.affiliatedcompanyhistory;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHist;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistByEmployee;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistItem;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistRepository;

/**
 * @author hieult
 *
 */
@Stateless
public class AffiliatedCompanyHistoryFinder {
	@Inject
	private AffCompanyHistRepository affCompanyHistRepository;
	
	//社員ID（List）と基準日から所属会社履歴項目を取得する
public List<AffCompanyHistItemDto> getByIDAndBasedate(GeneralDate baseDate , List<String> listempID){
	//ドメインモデル「所属会社履歴（社員別）」を取得する
	//(Lấy domain [AffCompanyHistByEmployee])
	List<AffCompanyHist> listAffCompanyHist = affCompanyHistRepository.getAffCompanyHistoryOfEmployeeListAndBaseDate(listempID, baseDate);
	List<AffCompanyHistItemDto> data = new ArrayList<>();
	for(AffCompanyHist aff: listAffCompanyHist){
		if (aff == null) {
			continue;
		}

		AffCompanyHistByEmployee empHist = aff.getLstAffCompanyHistByEmployee().get(0);

		if (empHist == null) {
			continue;
		}

		AffCompanyHistItem histItem = empHist.getLstAffCompanyHistoryItem().get(0);

		if (histItem == null) {
			continue;
		}
		data.add(new AffCompanyHistItemDto(empHist.getSId(), histItem.getHistoryId(), histItem.isDestinationData(), histItem.start(), histItem.end()));
	}
	return data;
}
}