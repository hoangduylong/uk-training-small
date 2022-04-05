package nts.uk.shr.infra.web.component.validation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import lombok.val;
import nts.arc.layer.ws.WebService;
import nts.uk.shr.infra.web.component.internal.TagContentsUtil;

@Path("/validate/constraints")
@Produces("application/json")
public class ValidatorWebService extends WebService {

	@POST
	@Path("map")
	public List<Map<String, Object>> generate(List<String> primitives) {
		List<Map<String, Object>> result = new ArrayList<>();
		for(String fqnOfPrimitiveValueClass : primitives) {
			Map<String, Object> primitive = new HashMap<>();
			val pvClass = TagContentsUtil.findClass(fqnOfPrimitiveValueClass)
					.orElseThrow(() -> new RuntimeException("PrimitiveValue not found: " + fqnOfPrimitiveValueClass));

			primitive.put("name", pvClass.getSimpleName());
			primitive.put("path", fqnOfPrimitiveValueClass);
			primitive.put("valueType", Helper.getValueType(pvClass));
			Helper.processConstraints(pvClass, (name, value) -> {
				primitive.put(name, value.replaceAll("'", ""));
			});
			result.add(primitive);
        }
		return result;
	}
}
