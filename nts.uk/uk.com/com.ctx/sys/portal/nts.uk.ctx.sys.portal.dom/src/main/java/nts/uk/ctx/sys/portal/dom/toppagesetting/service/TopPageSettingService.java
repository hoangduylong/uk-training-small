package nts.uk.ctx.sys.portal.dom.toppagesetting.service;

import java.util.Optional;

import javax.ejb.Stateless;

import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSetting;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageRoleSetting;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageSettings;

/**
 * The Interface TopPageSettingsSerivce.
 * DomainService トップページ設定を取得する
 */
@Stateless
public class TopPageSettingService {

	/**
	 * Gets the top page settings.
	 * 自分のトップページ設定を取得する
	 *
	 * @return the top page settings
	 */
	public Optional<TopPageSettings> getTopPageSettings(Require require, String companyId, String employeeId) {
		Optional<TopPagePersonSetting> topPagePersonSetting = require.getTopPagePersonSetting(
				companyId, 
				employeeId);
		if (topPagePersonSetting.isPresent()) {
			return Optional.of(topPagePersonSetting.get().getTopPageSettings());
		}
		Optional<String> roleSetCode = require.getRoleSetCode();
		if (!roleSetCode.isPresent()) {
			return Optional.empty();
		}
		Optional<TopPageRoleSetting> topPageRoleSetting = require.getTopPageRoleSetting(
				companyId, roleSetCode.get());
		if (topPageRoleSetting.isPresent()) {
			return Optional.of(topPageRoleSetting.get().getTopPageSettings());
		}
		return Optional.empty();
	}
	
	public static interface Require {
		/**
		 * Gets the top page person setting.
		 *	[R-1] 個人別トップページ設定を取得する(社員ID)
		 *	個人別トップページ設定Repository.取得する(社員ID)
		 * @param companyId the company id
		 * @param employeeId the employee id
		 * @return the top page person setting
		 */
		public Optional<TopPagePersonSetting> getTopPagePersonSetting(String companyId, String employeeId);
		
		/**
		 * Gets the role set code.
		 *	[R-2] ロールセットコードを取得する()
		 *	ロールセットコードを取得するAdapter.ログイン者のロールセットを取得する()
		 * @return the role set code
		 */
		public Optional<String> getRoleSetCode();

		/**
		 * Gets the top page role setting.
		 * [R-3] 権限別トップページ設定を取得する(ロールセットコード)
		 *	 権限別トップページ設定Repository.取得する(ロールセットコード)
		 * @param companyId the company id
		 * @param roleSetCode the role set code
		 * @return the top page role setting
		 */
		public Optional<TopPageRoleSetting> getTopPageRoleSetting(String companyId, String roleSetCode);
	}
}
