package nts.uk.ctx.sys.auth.app.find.webmenu;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.dom.roleset.webmenu.WebMenuAdapter;
import nts.uk.ctx.sys.auth.dom.roleset.webmenu.WebMenuImport;

@Stateless
public class WebmenuFider {
	@Inject
	private WebMenuAdapter webMenuAdapter;
	
	public List<WebMenuImport> getListWebMenuByCid(){
		List<WebMenuImport> data = webMenuAdapter.findByCompanyId();
		return data;
		
	}
}
