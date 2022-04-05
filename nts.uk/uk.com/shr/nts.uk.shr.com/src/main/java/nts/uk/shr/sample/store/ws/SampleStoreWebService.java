package nts.uk.shr.sample.store.ws;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.uk.shr.sample.store.ws.KeyValue.Columns;

@Path("/sample/store")
@Produces("application/json")
public class SampleStoreWebService {

	@Inject
	private SampleValues values;
	
	@Path("save")
	@POST
	public void save(KeyValue kv) {
		values.setValue(kv.getColumns());
	}
	
	@POST
	@Path("load")
	public Columns getItem(StringValue key) {
		return values.toColumns();
	}
}
