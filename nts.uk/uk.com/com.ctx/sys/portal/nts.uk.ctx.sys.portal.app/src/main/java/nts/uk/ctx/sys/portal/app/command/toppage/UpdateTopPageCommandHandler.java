/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.app.command.toppage;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.enums.System;
import nts.uk.ctx.sys.portal.dom.standardmenu.MenuDisplayName;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenu;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository;
import nts.uk.ctx.sys.portal.dom.toppage.Toppage;
import nts.uk.ctx.sys.portal.dom.toppage.ToppageRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class UpdateTopPageCommandHandler.
 */
@Stateless
public class UpdateTopPageCommandHandler extends CommandHandler<UpdateTopPageCommand> {

	/** The top page repository. */
	@Inject
	private ToppageRepository toppageNewRepository;

	@Inject
	private StandardMenuRepository standardMenuRepository;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.arc.layer.app.command.CommandHandler#handle(nts.arc.layer.app.command.
	 * CommandHandlerContext)
	 */
	@Override
	protected void handle(CommandHandlerContext<UpdateTopPageCommand> context) {
		UpdateTopPageCommand command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		// 対象の「トップページ」を取得する
		Optional<Toppage> findTopPage = toppageNewRepository.getByCidAndCode(companyId, command.getTopPageCode());
		Toppage topPage = Toppage.createFromMemento(command);
		// ドメインモデル「トップページ」を更新する
		if (findTopPage.isPresent()) {
			toppageNewRepository.update(topPage);
		} else {
			toppageNewRepository.insert(topPage);
		}
		// ドメインモデル「標準メニュー」を取得する
		Optional<StandardMenu> standarMenu = standardMenuRepository.findByCIDSystemMenuClassificationCode(companyId,
				System.COMMON.value, MenuClassification.TopPage.value, topPage.getTopPageCode().toString());
		if (standarMenu.isPresent()) {
			// ドメインモデル「標準メニュー」を更新する
			StandardMenu standardMenuUpdate = standarMenu.get();
			standardMenuUpdate.setTargetItems(topPage.getTopPageName().toString());
			standardMenuUpdate.setDisplayName(new MenuDisplayName(topPage.getTopPageName().toString()));
			// ドメインモデル「標準メニュー」を更新する
			standardMenuRepository.updateStandardMenu(standardMenuUpdate);
			;
		} else {
			// アルゴリズム「標準メニューを新規登録する」を実行する
			int maxDisplayOrder = standardMenuRepository.maxOrderStandardMenu(companyId, System.COMMON.value,
					MenuClassification.TopPage.value);
			StandardMenu standardMenu = StandardMenu.toNewDomain(companyId, System.COMMON.value,
					MenuClassification.TopPage.value, "A", "toppagecode=" + topPage.getTopPageCode(), "CCG008",
					topPage.getTopPageCode().v(), topPage.getTopPageName().v(), topPage.getTopPageName().v(),
					maxDisplayOrder + 1, 0, "/nts.uk.com.web/view/ccg/008/a/index.xhtml", 1, 0, 1, 1, 0);
			// 画面項目「トップページ一覧」に登録した内容を追加する
			standardMenuRepository.insertStandardMenu(standardMenu);
		}
	}
}
