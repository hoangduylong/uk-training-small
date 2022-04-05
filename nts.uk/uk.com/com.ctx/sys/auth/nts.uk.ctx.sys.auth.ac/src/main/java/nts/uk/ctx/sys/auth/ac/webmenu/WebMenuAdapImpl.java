package nts.uk.ctx.sys.auth.ac.webmenu;

import nts.uk.ctx.sys.auth.dom.adapter.webmenu.WebMenuAdapter;
import nts.uk.ctx.sys.auth.dom.adapter.webmenu.WebMenuExport;

import javax.ejb.Stateless;
import java.util.List;

@Stateless
public class WebMenuAdapImpl implements WebMenuAdapter {
    @Override
    public List<WebMenuExport> findByCompanyId(String companyId) {
        return null;
    }
}
