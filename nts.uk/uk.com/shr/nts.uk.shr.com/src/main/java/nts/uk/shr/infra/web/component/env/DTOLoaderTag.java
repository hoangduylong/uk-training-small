package nts.uk.shr.infra.web.component.env;

import java.io.IOException;
import java.util.stream.Collectors;

import javax.enterprise.inject.spi.CDI;
import javax.faces.component.FacesComponent;
import javax.faces.component.UIComponentBase;
import javax.faces.context.FacesContext;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.val;
import lombok.Value;
import nts.uk.shr.com.misc.DTOLoader;
import nts.uk.shr.infra.web.component.internal.TagContentsUtil;

@FacesComponent(tagName = "dtoloader", createTag = true)
public class DTOLoaderTag extends UIComponentBase {

	private static final String JS_VAR_NAME = "__viewContext.env.dtos";
	
	@Override
	public String getFamily() {
		return this.getClass().getName();
	}
	
	@Override
    public void encodeBegin(FacesContext context) throws IOException {

        val rw = context.getResponseWriter();
        
        rw.write("<script>");
        rw.write("\t");
        rw.write(JS_VAR_NAME);
        rw.write(" = ");
        rw.write(JS_VAR_NAME);
        rw.write(" || {};");

        val items = TagContentsUtil.readMultipleLinesString(this.getChildren().get(0).toString()).stream()
        		.map(s -> {
        			val parts = s.split(" ");
        			return new DescribedItem(parts[0], parts[1]);
        		}).collect(Collectors.toList());
        
        for (val item : items) {
        	rw.write(JS_VAR_NAME);
        	rw.write(".");
        	rw.write(item.getDtoName());
        	rw.write(" = ");
        	rw.write(toJsonString(item.getLoader().load()));
        	rw.write(";");
        }

        rw.write("</script>");

        // if not cleared, content strings is shown on browser...
        this.getChildren().clear();
	}
	
	private static String toJsonString(Object obj) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.writeValueAsString(obj);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}
	
	@Value
	private static class DescribedItem {
		private final String dtoName;
		private final String loaderFqn;
		
		public DTOLoader<?> getLoader() {
			val loaderClass = TagContentsUtil.findClass(this.loaderFqn)
					.orElseThrow(() -> new RuntimeException("Loader not found: " + this.loaderFqn));
			return (DTOLoader<?>)(CDI.current().select(loaderClass).get());
		}
	}
}
