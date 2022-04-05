/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.dom.toppage.service.internal;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.enums.System;
import nts.uk.ctx.sys.portal.dom.layout.Layout;
import nts.uk.ctx.sys.portal.dom.layout.LayoutRepository;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenu;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository;
import nts.uk.ctx.sys.portal.dom.toppage.Toppage;
import nts.uk.ctx.sys.portal.dom.toppage.ToppageRepository;
import nts.uk.ctx.sys.portal.dom.toppage.service.TopPageService;

/**
 * The Class TopPageServiceImpl.
 */
@Stateless
public class TopPageServiceImpl implements TopPageService {

	/** The top page repository. */
	@Inject
	private ToppageRepository topPageRepository;
	
	@Inject
	private LayoutRepository layoutNewRepository;

	@Inject
	private StandardMenuRepository standardMenuRepo;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.portal.dom.toppage.service.TopPageService#copyTopPage(nts.
	 * uk.ctx.sys.portal.dom.toppage.TopPage, java.lang.String)
	 * Update Ver11 by NWS_HuyCV
	 */
	@Override
	public void copyTopPage(Toppage topPage, String companyId, boolean isCheckOverWrite, String copyCode) {
		// コピー先「トップページ」を取得する
		Optional<Toppage> findTopPageNew = topPageRepository.getByCidAndCode(companyId, topPage.getTopPageCode().v());
		Optional<Toppage> findOldTopPage = topPageRepository.getByCidAndCode(companyId, copyCode);
		List<Layout> lsLayoutsOld = layoutNewRepository.getByCidAndCode(companyId, copyCode);
		Optional<StandardMenu> findSandardMenu = 
				standardMenuRepo.findByCIDSystemMenuClassificationCode(companyId, System.COMMON.value, MenuClassification.TopPage.value, copyCode);
		
		if (findTopPageNew.isPresent()) {
			// 取得件数≠０件の場合
			if (isCheckOverWrite) { // 上書きチェックありの場合
				// コピー先「トップページ」を削除する
				topPageRepository.delete(companyId, findTopPageNew.get().getTopPageCode().toString());
				List<BigDecimal> lstLayoutNo = layoutNewRepository.getLstLayoutNo(findTopPageNew.get().getTopPageCode().toString());
				
				if (!lstLayoutNo.isEmpty()) {
					// コピー先「トップページ」の「レイアウト」を削除する
					layoutNewRepository.delete(companyId, findTopPageNew.get().getTopPageCode().toString(), lstLayoutNo);
				}
			} else {
				// 上書きチェックなしの場合
				// エラーメッセージ（#Msg_3#）を表示
				throw new BusinessException("Msg_3");
			}
		}
		// コピー元「トップページ」から「トップページ」を新規登録する
		topPageRepository.insert(topPage);
		
		if (findOldTopPage.isPresent()) {
			// コピー元レイアウトが登録済みの場合
			if (!lsLayoutsOld.isEmpty()) {
				for(Layout layout: lsLayoutsOld) {
					layout.setTopPageCode(topPage.getTopPageCode().toString());
					// コピー元「レイアウト」を元に「レイアウト」を新規登録する
					layoutNewRepository.insert(layout);
				}
			}
		}

		// ドメインモデル「標準メニュー」を取得する
		Optional<StandardMenu> newSandardMenu = 
				standardMenuRepo.findByCIDSystemMenuClassificationCode(companyId, System.COMMON.value, MenuClassification.TopPage.value, topPage.getTopPageCode().v());
		if (newSandardMenu.isPresent()) {
			// 1件の場合L̥
			if (findSandardMenu.isPresent()) {
				StandardMenu standardMenu = findSandardMenu.get();
				standardMenu.setDataItem("toppagecode=" + topPage.getTopPageCode(), topPage.getTopPageCode().v(), topPage.getTopPageName().v(), topPage.getTopPageName().v());
				standardMenuRepo.updateStandardMenu(standardMenu);
			}
		} else {
			// 0件の場合
			// アルゴリズム「標準メニューを新規登録する」を実行する
			int maxDisplayOrder = standardMenuRepo.maxOrderStandardMenu(companyId, System.COMMON.value, MenuClassification.TopPage.value);
			StandardMenu standardMenu = StandardMenu.toNewDomain(companyId, System.COMMON.value, MenuClassification.TopPage.value,
					"A", "toppagecode=" + topPage.getTopPageCode(), "CCG008", topPage.getTopPageCode().v(), topPage.getTopPageName().v(),
					topPage.getTopPageName().v(), maxDisplayOrder + 1, 0, "/nts.uk.com.web/view/ccg/008/a/index.xhtml", 1, 0, 1, 1, 0);
			
			standardMenuRepo.insertStandardMenu(standardMenu);
		}
	}
}
