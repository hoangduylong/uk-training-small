package nts.uk.ctx.sys.portal.dom.generalsearch.service;

import javax.ejb.Stateless;

import nts.uk.ctx.sys.portal.dom.adapter.generalsearch.LoginRulerImport;

/**
 * The Interface GeneralSearchHistoryService.
 */
@Stateless
public class GeneralSearchHistoryService {
	
	/**
	 * Check role search manual.
	 * ログイン者はマニュアル検索できるか判断する
	 *
	 * @param forCompanyAdmin the for company admin
	 * @param forSystemAdmin the for system admin
	 * @return true, if successful
	 */
	public boolean checkRoleSearchManual(Require require, String forCompanyAdmin, String forSystemAdmin) {
		// ログインユーザコンテキスト．権限情報．システム管理者のロールID ≠ null 
		// OR ログインユーザコンテキスト．権限情報．会社管理者のロールID ≠ null 
		if (forCompanyAdmin != null || forSystemAdmin != null) {
			return true;
		}
		// call：ログイン者が担当者かチェックする＃担当者か ()														
		// return　担当者かのOUTPUT											
		return require.getLoginResponsible().isPersonIncharge();
	}
	
	public static interface Require {
		
		/**
		 * Gets the login responsible.
		 *	ログイン者のルール担当を取得する
		 *	ログイン者のロール担当の判断Adapter
		 *	[1] ログイン者のルール担当
		 * @return the login responsible
		 */
		public LoginRulerImport getLoginResponsible();
	}
}
