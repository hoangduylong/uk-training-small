package nts.uk.ctx.bs.employee.dom.foreigner.residence.hisinfo;

import java.util.List;

import javax.ejb.Stateless;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo.ForeignerResidenceHistoryInforItem;

/**
 * 社員_外国人在留履歴情報
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Stateless
public class EmpForeignerResidenceManagement extends AggregateRoot {
	
	// 外国人在留履歴情報のリスト
	private List<ForeignerResidenceHistoryInforItem> foreignerResidenceHisInfoItems;
	
	// 検索済み個人IDリスト
	private List<String> searchedPIDs;
	
	public void fillData(List<ForeignerResidenceHistoryInforItem> foreignerResidenceHisInfoItems, List<String> searchedPIDs){
		this.foreignerResidenceHisInfoItems = foreignerResidenceHisInfoItems;
		this.searchedPIDs = searchedPIDs;
	}
}
