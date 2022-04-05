package nts.uk.shr.infra.web.component.enums;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import lombok.val;
import nts.arc.enums.EnumAdaptor;
import nts.uk.shr.infra.web.component.internal.TagContentsUtil;

@Path("/enums")
@Produces("application/json")
public class EnumWebService {
	
	@POST
	@Path("map") 
	public Map<String, List<EnumElement>> generate(List<String> primitives) {
		Map<String, List<EnumElement>> result = new HashMap<>();
		for(String enumClassName : primitives) {
			@SuppressWarnings("unchecked")
			val enumClass = (Class<Enum<?>>) TagContentsUtil.findClass(enumClassName).get();
			String enumName = enumClass.getSimpleName();
			val enumFields = EnumAdaptor.convertToValueNameList(enumClass);
			
			List<EnumElement> enumElements = enumFields.stream()
					.map(field -> new EnumElement(field.getValue(), field.getLocalizedName()))
					.collect(Collectors.toList());
			
			result.put(enumName, enumElements);
		}
		return result;
	}
	
	class EnumElement {
		int value;
		String name;
		
		public EnumElement(int value, String name) {
			this.value = value;
			this.name = name;
		}
		
		public int getValue() {
			return this.value;
		}
		
		public String getName() {
			return this.name;
		}
	}

}
