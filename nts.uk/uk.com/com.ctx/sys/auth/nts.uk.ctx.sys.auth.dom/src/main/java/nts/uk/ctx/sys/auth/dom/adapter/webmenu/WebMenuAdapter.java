package nts.uk.ctx.sys.auth.dom.adapter.webmenu;

import java.util.List;

public interface WebMenuAdapter {
    /**
     * Get list of web menu by company id
     * @param companyId
     * @return
     */
    List<WebMenuExport> findByCompanyId(String companyId);

}
