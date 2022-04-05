package nts.uk.shr.infra.i18n.resource.web.view;

import java.util.Collections;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Named;

import nts.arc.i18n.I18NResources;
import nts.gul.text.StringUtil;

@ApplicationScoped
@Named("i18n")
public class I18NLoaderForJSFView {
	
	@Inject
	private I18NResources resources;
	
	public String getText(String itemId, List<String> params) {
		if (StringUtil.isNullOrEmpty(itemId, true)) {
			return "not found";
		}
		
		this.resources.refreshIfRequired();
		
		return this.resources.localize(itemId,params.toArray(new String[params.size()]))
				.orElse(itemId);
	}
	
	public String getText(String itemId) {
		return this.getText(itemId, Collections.emptyList());
	}
	
}
