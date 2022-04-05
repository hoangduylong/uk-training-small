package nts.uk.shr.infra.web.component;

import java.io.IOException;

import javax.faces.component.FacesComponent;
import javax.faces.component.UIComponentBase;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;

@FacesComponent(createTag = true, tagName = "load")
public class HtmlLoader extends UIComponentBase {

	@Override
	public String getFamily() {
		return this.getClass().getName();
	}

	@Override
	public void encodeBegin(FacesContext context) throws IOException {
		ResponseWriter rw = context.getResponseWriter();
		String path = (String) this.getAttributes().get("path");
		rw.write("<div class='html-loading' link='"+ path + "'></div>");
		super.encodeBegin(context);

	}
}
