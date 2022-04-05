package nts.uk.ctx.sys.auth.ws.webmenu;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.uk.ctx.sys.auth.app.find.webmenu.WebmenuFider;
import nts.uk.ctx.sys.auth.dom.roleset.webmenu.WebMenuImport;

@Path("ctx/sys/auth/webmenu")
@Produces("application/json")
public class WebMenuWebService {

    @Inject
    private WebmenuFider webmenuFider;

    @POST
    @Path("getlistwebmenu")
    public List<WebMenuImport> removeSelectionItem() {
        return this.webmenuFider.getListWebMenuByCid();
    }
}
