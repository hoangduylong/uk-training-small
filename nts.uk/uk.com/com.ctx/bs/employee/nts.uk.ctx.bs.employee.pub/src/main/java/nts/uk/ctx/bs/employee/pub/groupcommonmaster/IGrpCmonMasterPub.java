package nts.uk.ctx.bs.employee.pub.groupcommonmaster;

import java.util.Optional;

import nts.uk.ctx.bs.employee.pub.groupcommonmaster.export.GrpCmonMasterExprort;

public interface IGrpCmonMasterPub {
	
	/**
	 * get domain グループ会社共通マスタ by 共通マスタID and 契約コード
	 * @author yennth
	 */
	Optional<GrpCmonMasterExprort> findCommonMasterByContract(String contractCd, String cmMasterId);
}
