package nts.uk.ctx.sys.gateway.pub.authmana;

import java.util.List;

public interface ListCompanySwitchablePub {

	/**
	 * 切替可能な会社一覧を取得する
	 * @param userID
	 * @return
	 */
	public List<String> getCompanyList(String userID, String contractCd);
}
