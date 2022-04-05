package nts.uk.ctx.sys.portal.app.find.smartphonetoppage;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.portal.dom.enums.System;
import nts.uk.ctx.sys.portal.dom.smartphonetoppageset.NotificationDetailSet;
import nts.uk.ctx.sys.portal.dom.smartphonetoppageset.SPTopPageSetRepository;
import nts.uk.ctx.sys.portal.dom.smartphonetoppageset.TimeStatusDetailsSet;
import nts.uk.ctx.sys.portal.dom.smartphonetoppageset.Type;
import nts.uk.shr.com.context.AppContexts;

/**
 * @author sonnh1
 *
 */
@Stateless
public class SPTopPageFinder {

	@Inject
	private SPTopPageSetRepository repo;

	/**
	 * アルゴリズム「指定会社のトップページ設定を取得する」を実行する
	 * 
	 * @return
	 */
	public List<SPTopPageSetDto> getTopPageSet() {
		String companyId = AppContexts.user().companyId();
		// ドメインモデル「スマホのトップページ」を取得する
		List<SPTopPageSetDto> results = this.repo.getTopPageSet(companyId, System.TIME_SHEET.value).stream()
				.map(x -> new SPTopPageSetDto(companyId, System.TIME_SHEET.value,
						x.getSmartPhoneTopPageType().getType().value, x.getDisplayAtr().value))
				.collect(Collectors.toList());

		if (results.size() == 0) {
			// システムエラー
			throw new RuntimeException("SYSTEM ERROR!");
		}

		return results;
	}

	/**
	 * 起動時処理
	 * 
	 * @param mode
	 * @return
	 */
	public List<SPTopPageDetailDto> getTopPageDetail(int mode) {
		String companyId = AppContexts.user().companyId();
		List<SPTopPageDetailDto> results = new ArrayList<>();
		// Input．起動モードをチェックする
		if (mode == Type.NOTIFICATION.value) {
			// アルゴリズム「指定会社の通知詳細設定を取得する」を実行する
			Optional<NotificationDetailSet> optNoti = this.repo.getNotificationDetailSet(companyId, mode);
			if (!optNoti.isPresent()) {
				return Collections.emptyList();
			}

			optNoti.get().getDetailedItem().forEach(x -> {
				SPTopPageDetailDto dto = new SPTopPageDetailDto(companyId, Type.NOTIFICATION.value,
						x.getDisplayAtr().value, x.getDetailType().value);
				results.add(dto);
			});
		} else {
			// アルゴリズム「指定会社の勤怠状況詳細設定を取得する」を実行する
			Optional<TimeStatusDetailsSet> optStatus = this.repo.getTimeStatusDetailsSet(companyId, mode);
			if (!optStatus.isPresent()) {
				return Collections.emptyList();
			}
			optStatus.get().getDetailedItem().forEach(x -> {
				SPTopPageDetailDto dto = new SPTopPageDetailDto(companyId, Type.TIME_STATUS.value,
						x.getDisplayAtr().value, x.getDetailType().value);
				results.add(dto);
			});
		}

		return results;
	}
}
