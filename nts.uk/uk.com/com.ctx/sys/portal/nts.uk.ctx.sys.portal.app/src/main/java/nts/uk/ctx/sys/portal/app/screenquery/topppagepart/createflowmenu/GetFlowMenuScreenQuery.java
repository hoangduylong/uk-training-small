package nts.uk.ctx.sys.portal.app.screenquery.topppagepart.createflowmenu;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.CreateFlowMenuRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG034_フローページの作成.A：フローメニューの作成.メニュー別OCD.フローメニュー作成を取得する
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class GetFlowMenuScreenQuery {

	@Inject
	private CreateFlowMenuRepository createFlowMenuRepository;
	
	public CreateFlowMenuDto getFlowMenu(String flowMenuCode) {
		//1. get(ログイン会社ID、フローメニューコード)
		return this.createFlowMenuRepository.findByPk(AppContexts.user().companyId(), flowMenuCode)
				.map(domain -> {
					CreateFlowMenuDto dto = new CreateFlowMenuDto();
					domain.setMemento(dto, AppContexts.user().contractCode());
					return dto;
				}).orElse(null);
	}
}
