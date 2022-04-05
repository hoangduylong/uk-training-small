package nts.uk.shr.infra.i18n.ws;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.shr.infra.i18n.dto.LanguageMasterDto;
import nts.uk.shr.infra.i18n.loading.LanguageMasterRepository;

@Path("/language")
@Produces("application/json")
public class LanguageWebService extends WebService{

	@Inject
	private LanguageMasterRepository language;
	
	@POST
	@Path("findall")
	public List<LanguageMasterDto> getSystemLanguages() {
		return this.language.getSystemLanguages();
	}
}
