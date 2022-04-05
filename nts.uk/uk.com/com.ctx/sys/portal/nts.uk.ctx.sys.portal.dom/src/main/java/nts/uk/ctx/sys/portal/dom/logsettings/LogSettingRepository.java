package nts.uk.ctx.sys.portal.dom.logsettings;

import java.util.List;

public interface LogSettingRepository {
	
	/**
	 * システムからログ設定を取得
	 * 
	 * @param システム system
	 * @param 会社ID companyId
	 * @return List＜ログ設定＞
	 */
	List<LogSetting> findBySystem(String companyId, int systemType);
	
	/**
	 * ドメインモデル「ログ設定」を削除
	 * @param contractCode
	 * @param listDomain
	 */
	void addAll(String contractCode, List<LogSetting> listDomain);

	/**
	 * ドメインモデル「ログ設定」に追加する
	 * @param companyId
	 * @param systemType
	 * @param programId
	 */
	void delete(String companyId, Integer systemType);
}
