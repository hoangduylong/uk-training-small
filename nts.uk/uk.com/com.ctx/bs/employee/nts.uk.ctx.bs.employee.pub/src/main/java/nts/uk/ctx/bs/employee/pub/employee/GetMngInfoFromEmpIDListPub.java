package nts.uk.ctx.bs.employee.pub.employee;

import java.util.List;

/**
 * 
 * @author xuannt
 *	UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.Export.社員IDListから管理情報を取得する
 */
public interface GetMngInfoFromEmpIDListPub {
	
	//	取得する(List<社員IDList: 社員ID>): List<社員データ>
	List<EmpDataExport> getEmpData(List<String> empIDList); 
}
