package nts.uk.shr.infra.contact.postalcode.ws;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.infra.contact.postalcode.dto.PostalCodeDto;
import nts.uk.shr.infra.contact.postalcode.repository.PostalCodeRepository;

@Path("contact/postalcode")
@Produces("application/json")
public class PostalCodeWebservice extends WebService {
	@Inject
	private PostalCodeRepository postRep;

	@POST
	@Path("findAll")
	public List<PostalCodeDto> findAll() {
		return this.postRep.findAll();
	}

	@POST
	@Path("find/{postalId}")
	public PostalCodeDto findById(@PathParam("postalId") String postalId) {
		return this.postRep.find(postalId, AppContexts.user().contractCode()).orElse(null);
	}

	@POST
	@Path("findByCode/{postalCode}")
	public List<PostalCodeDto> findByCode(@PathParam("postalCode") String postalCode) {
		return this.postRep.findByCode(postalCode, AppContexts.user().contractCode());
	}
}
