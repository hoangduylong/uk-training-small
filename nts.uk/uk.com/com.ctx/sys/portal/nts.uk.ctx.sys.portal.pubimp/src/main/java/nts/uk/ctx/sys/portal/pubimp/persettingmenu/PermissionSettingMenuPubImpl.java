package nts.uk.ctx.sys.portal.pubimp.persettingmenu;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import nts.uk.ctx.sys.portal.dom.permissionmenu.PermissionSettingMenu;
import nts.uk.ctx.sys.portal.dom.permissionmenu.PermissionSettingMenuRepository;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenu;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository;
import nts.uk.ctx.sys.portal.pub.persettingmenu.PermissionSettingMenuExport;
import nts.uk.ctx.sys.portal.pub.persettingmenu.PermissionSettingMenuPub;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class PermissionSettingMenuPubImpl implements PermissionSettingMenuPub{
	@Inject
	private PermissionSettingMenuRepository perSettingMenuRepo;
	@Inject
	private StandardMenuRepository standardMenuRepo;
	@Override
	public List<PermissionSettingMenuExport> findByRoleType(int roleType) {
		List<PermissionSettingMenuExport> result = new ArrayList<PermissionSettingMenuExport>();
		List<PermissionSettingMenu> perMenues = perSettingMenuRepo.findbyRoleType(roleType);

		if (perMenues != null && !perMenues.isEmpty()) {
			perMenues.forEach(m -> {
				StandardMenu standardMenu = standardMenuRepo.getStandardMenubyCode(
						AppContexts.user().companyId(), m.getMenuCode().toString(), m.getSystem().value,
						m.getClassification().value).orElse(null);
				if(standardMenu != null) {
					PermissionSettingMenuExport dto = new PermissionSettingMenuExport();
					dto.setCode(standardMenu.getCode().toString());
					dto.setDisplayName(standardMenu.getDisplayName().toString());
					dto.setProgramId(standardMenu.getProgramId());
					dto.setScreenId(standardMenu.getScreenId());
					dto.setQueryString(standardMenu.getQueryString());
					result.add(dto);
				}
			});
		}
		if(!result.isEmpty()) result.sort((a,b) -> a.getCode().compareTo(b.getCode()));
		return result;
	}

}
