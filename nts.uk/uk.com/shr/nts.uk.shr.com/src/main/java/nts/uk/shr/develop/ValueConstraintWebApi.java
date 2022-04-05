package nts.uk.shr.develop;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import lombok.SneakyThrows;

@Produces(MediaType.APPLICATION_JSON)
@Path("/develop/value-constraint")
public class ValueConstraintWebApi {

	@GET
	@SneakyThrows
	public ValueConstraint get(@QueryParam("fqn") String fqn) {
		
		Class<?> constraintClass = Class.forName(fqn);
		
		return ValueConstraint.of(constraintClass);
	}
}
