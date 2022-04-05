/**
 * 
 */
package nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDateTime;

public interface ForeignerResidenceRepository {
	
	// 外国人在留履歴情報をロードする
	List<ForeignerResidenceHistoryInforItem> getListForeignerResidenceHistoryInforItem(List<String> listPID , GeneralDateTime baseDate);

	// 外国人在留履歴情報の取得
	Optional<ForeignerResidenceHistoryInforItem> getForeignerResidenceHistoryInforItem(String pId , GeneralDateTime baseDate);

	// 社員IDリストより外国人在留履歴情報をロードする
	List<ForeignerResidenceHistoryInforItem> getListForeignerResidenceHistoryInforItem(List<String> listSID);
	
	// 社員IDより外国人在留履歴情報を取得する
	Optional<ForeignerResidenceHistoryInforItem> getListForeignerResidenceHistoryInforItem(String sid);
	
}
