/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.app.command.toppage;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.enums.System;
import nts.uk.ctx.sys.portal.dom.layout.LayoutRepository;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository;
import nts.uk.ctx.sys.portal.dom.toppage.Toppage;
import nts.uk.ctx.sys.portal.dom.toppage.ToppageRepository;
import nts.uk.ctx.sys.portal.dom.webmenu.WebMenuRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class DeleteTopPageCommandHandler.
 */
@Transactional
@Stateless
public class DeleteTopPageCommandHandler extends CommandHandler<DeleteTopPageCommand> {
	
	@Inject
	private WebMenuRepository webMenuRepository;
	@Inject
	private LayoutRepository layoutNewRepository;
	@Inject
	private ToppageRepository toppageNewRepository;
	@Inject
	private StandardMenuRepository standardMenuRepo;

	/* (non-Javadoc)
	 * @see nts.arc.layer.app.command.CommandHandler#handle(nts.arc.layer.app.command.CommandHandlerContext)
	 */
	@Override
	protected void handle(CommandHandlerContext<DeleteTopPageCommand> context) {
		DeleteTopPageCommand command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		
		List<BigDecimal> lstLayoutNo = layoutNewRepository.getLstLayoutNo(command.getTopPageCode());
		
		if (!lstLayoutNo.isEmpty()) {
			// 「レイアウト」を削除する
			layoutNewRepository.delete(companyId, command.getTopPageCode(), lstLayoutNo);
		}
		Optional<Toppage> tp = toppageNewRepository.getByCidAndCode(companyId, command.getTopPageCode());
		if (tp.isPresent()) {
			// 「トップページ」を削除する
			toppageNewRepository.delete(companyId, command.getTopPageCode());
		}
		// ドメインモデル「標準メニュー」を削除する
		standardMenuRepo.deleteStandardMenu(companyId, command.getTopPageCode(), System.COMMON.value, MenuClassification.TopPage.value);
		// ドメインモデル「Webメニュー」に紐付く「ツリーメニュー」を削除する
		webMenuRepository.removeTreeMenu(companyId, MenuClassification.TopPage.value, command.getTopPageCode());
	}

}
