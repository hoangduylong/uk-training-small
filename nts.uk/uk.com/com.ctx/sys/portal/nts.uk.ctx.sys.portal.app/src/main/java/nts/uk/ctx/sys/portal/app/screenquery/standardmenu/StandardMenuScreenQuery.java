package nts.uk.ctx.sys.portal.app.screenquery.standardmenu;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.uk.ctx.sys.portal.app.find.standardmenu.StandardMenuDto;
import nts.uk.ctx.sys.portal.dom.enums.MenuAtr;
import nts.uk.ctx.sys.portal.dom.enums.WebMenuSetting;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.MenuClassification;
import nts.uk.shr.com.context.AppContexts;

/**
 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG034_フローページの作成.F：メニュー設定.メニュー別OCD.フローメニュー作成の標準メニューを取得する
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class StandardMenuScreenQuery {

	@Inject
	private StandardMenuRepository standardMenuRepository;
	
	public List<StandardMenuDto> getStandardMenus() {
		//1. メニュー分類＝標準(0)　AND　Webメニュー設定表示区分＝表示　AND　メニュー属性＝メニュー
		return this.standardMenuRepository.findByMenuAndWebMenuDisplay(
			AppContexts.user().companyId(), 
			MenuClassification.STANDARD.value,
			MenuAtr.Menu.value, 
			WebMenuSetting.Display.value).stream()
				.map(StandardMenuDto::fromDomain)
				.sorted(Comparator
						.comparing(StandardMenuDto::getSystem)
						.thenComparing(StandardMenuDto::getDisplayOrder)
						.thenComparing(StandardMenuDto::getCode))
				.collect(Collectors.toList());
	}
}
