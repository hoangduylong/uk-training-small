/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.app.command.toppage;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.enums.System;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenu;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository;
import nts.uk.ctx.sys.portal.dom.toppage.Toppage;
import nts.uk.ctx.sys.portal.dom.toppage.ToppageRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class RegisterTopPageCommandHandler.
 */
@Stateless
public class RegisterTopPageCommandHandler extends CommandHandler<RegisterTopPageCommand> {

	/** The top page repository. */
	@Inject
	private ToppageRepository topPageNewRepository;
	
	@Inject
	private StandardMenuRepository standardMenuRepository;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.arc.layer.app.command.CommandHandler#handle(nts.arc.layer.app.command
	 * .CommandHandlerContext)
	 */
	@Override
	protected void handle(CommandHandlerContext<RegisterTopPageCommand> context) {
		RegisterTopPageCommand command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		command.setCid(companyId);
		
		// ドメインモデル「トップページ」の重複をチェックする
		Optional<Toppage> findTopPage = this.topPageNewRepository.getByCidAndCode(companyId, command.getTopPageCode());
		if (findTopPage.isPresent()) {
			// エラーメッセージ（#Msg_3#）を表示する
			throw new BusinessException("Msg_3");
		} 

		// to Domain
		Toppage topPage = Toppage.createFromMemento(command);
		
		// ドメインモデル「トップページ」を登録する
		this.topPageNewRepository.insert(topPage);
		
		// アルゴリズム「標準メニューを新規登録する」を実行する
		int maxDisplayOrder = this.standardMenuRepository.maxOrderStandardMenu(companyId, System.COMMON.value, MenuClassification.TopPage.value);

		/**	EA add to standard menu
		 *  入力：
		 * 	会社ID←ログイン会社ID
		 * 	コード←トップページ。 コード
		 * 	システム←標準メニュー。 システム
		 * 	メニュー分類←標準メニュー。 メニューの分類
		 * 	対象項目←トップページ。 名
		 * 	表示名←トップページ 名
		 * 	表示順序←上記の表示順序	
		 * 	メニュー属性←0
		 * 	URL← "/nts.uk.com.web/view/ccg/008/a/index.xhtml"
		 * 	ウェブメニュー設定表示分類←1
		 * 	ログイン後表示分類←0
		 * 	ログ設定インジケータ←1
		 *  画面ID←A
		 *  クエリ文字列← "toppagecode =" +トップページ。 コード
		 * 	プログラムID← "CCG008"
		 *  Update by NWS_HuyCV ver11
		*/
		Optional<StandardMenu> oldStandardMenu = this.standardMenuRepository.findByCIDSystemMenuClassificationCode(
				companyId, 
				System.COMMON.value, 
				MenuClassification.TopPage.value, 
				topPage.getTopPageCode().v());
		if (oldStandardMenu.isPresent()) {
			this.standardMenuRepository.deleteStandardMenu(
				companyId,
				topPage.getTopPageCode().v(),
				System.COMMON.value, 
				MenuClassification.TopPage.value);
		}
		StandardMenu standardMenu = StandardMenu.toNewDomain(companyId, System.COMMON.value, MenuClassification.TopPage.value,
				"A", "toppagecode=" + topPage.getTopPageCode(), "CCG008", topPage.getTopPageCode().v(), topPage.getTopPageName().v(),
				topPage.getTopPageName().v(), maxDisplayOrder + 1, 0, "/nts.uk.com.web/view/ccg/008/a/index.xhtml", 1, 0, 1, 1, 0);
		// 画面項目「トップページ一覧」に登録した内容を追加する
		this.standardMenuRepository.insertStandardMenu(standardMenu);
	}
}
