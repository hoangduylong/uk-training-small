package nts.uk.shr.sample.query.nativequery;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/sample/nativequery")
@Produces("application/json")
public class SampleNativeQueryWebService {

	@Inject
	private SampleNativeQueryRepositoryImpl repository;
	
	@POST
	@Path("test")
	public void test() {
		this.repository.test();
	}
}
