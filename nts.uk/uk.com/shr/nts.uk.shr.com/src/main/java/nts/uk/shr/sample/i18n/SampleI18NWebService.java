package nts.uk.shr.sample.i18n;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import lombok.Value;
import nts.uk.shr.com.i18n.resource.I18NResourceCustomizer;

@Path("/sample/i18n")
@Produces("application/json")
public class SampleI18NWebService {

	@Inject
	private I18NResourceCustomizer custom;
	
	@POST
	@Path("replace/system")
	public void replaceSystemClass(SystemClassResource newResource) {
		this.custom.replaceSystemClass(newResource.getId(), newResource.getContent());
	}
	
	@Value
	public static class SystemClassResource {
		private final String id;
		private final String content;
	}
}
