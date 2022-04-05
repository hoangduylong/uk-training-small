package nts.uk.ctx.sys.portal.app.screenquery.topppagepart.createflowmenu;

import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.CreateFlowMenuRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG034_フローページの作成.A：フローメニューの作成.メニュー別OCD.フローメニュー作成のリストを取得する
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class GetFlowMenuListScreenQuery {

	@Inject
	private CreateFlowMenuRepository createFlowMenuRepository;
	
	public Map<String, String> getList() {
		//1. get(ログイン会社ID)
		return this.createFlowMenuRepository.findByCid(AppContexts.user().companyId())
				.stream()
				.collect(Collectors.toMap(
						d -> d.getFlowMenuCode().v(),
						d -> d.getFlowMenuName().v(),
						(o1, o2) -> o1,
						TreeMap::new
				));
	}
}
