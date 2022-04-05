package nts.uk.ctx.sys.portal.app.command.webmenu.smartphonemenu;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.app.find.webmenu.smartphonemenu.SPMenuEmpDto;
import nts.uk.ctx.sys.portal.dom.webmenu.smartphonemenu.SPMenuEmployment;
import nts.uk.ctx.sys.portal.dom.webmenu.smartphonemenu.SPMenuRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * 
 * アルゴリズム「設定済みロールを取得する」を実行する
 * 
 * @author sonnh1
 *
 */
@Stateless
public class UpdateSPMenuCommandHandler extends CommandHandler<UpdateSPMenuCommand> {

	@Inject
	private SPMenuRepository repo;

	@Override
	protected void handle(CommandHandlerContext<UpdateSPMenuCommand> context) {
		String companyId = AppContexts.user().companyId();
		List<SPMenuEmpDto> lstSPMenuEmpDto = context.getCommand().getLstSPMenuEmp();
		// 1 transaction chi co 1 roleId
		String roleId = lstSPMenuEmpDto.get(0).getEmploymentRole();
		List<String> listMenuCode = lstSPMenuEmpDto.stream().map(x -> x.getMenuCd()).collect(Collectors.toList());

		List<SPMenuEmployment> lstSPMenuEmpInsert = new ArrayList<>();
		List<SPMenuEmployment> lstSPMenuEmpUpdate = new ArrayList<>();

		List<SPMenuEmployment> lstSPMenuEmployment = lstSPMenuEmpDto.stream().map(x -> SPMenuEmployment
				.createFromJavaType(companyId, x.getEmploymentRole(), x.getMenuCd(), x.getDisplayAtr()))
				.collect(Collectors.toList());
		// find list menu exist in DB
		Map<String, Integer> mapMenu = this.repo.getDataEmp(companyId, roleId, listMenuCode).stream()
				.collect(Collectors.toMap(x -> x.getMenuCode().v(), x -> x.getDisplayAtr().value));

		lstSPMenuEmployment.forEach(spMenuEmp -> {
			String menuCode = spMenuEmp.getMenuCode().v();
			// check gia tri xem co phai la menuCd duoc update hay k?
			if (!mapMenu.containsKey(menuCode)) {
				lstSPMenuEmpInsert.add(spMenuEmp);
			} else if (mapMenu.get(menuCode) != spMenuEmp.getDisplayAtr().value) {
				lstSPMenuEmpUpdate.add(spMenuEmp);
			}
		});

		if (lstSPMenuEmpInsert.size() > 0) {
			this.repo.add(lstSPMenuEmpInsert);
		}

		if (lstSPMenuEmpUpdate.size() > 0) {
			this.repo.update(lstSPMenuEmpUpdate);
		}
	}

}
