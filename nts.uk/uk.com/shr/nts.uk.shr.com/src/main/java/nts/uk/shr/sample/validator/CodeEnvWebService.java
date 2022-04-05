package nts.uk.shr.sample.validator;

import java.lang.annotation.Annotation;
import java.util.Arrays;
import java.util.stream.Stream;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import lombok.val;
import nts.arc.layer.app.command.JavaTypeResult;
import nts.arc.primitive.constraint.PrimitiveValueConstraintPackage;
import nts.uk.shr.infra.web.component.internal.TagContentsUtil;
import nts.uk.shr.infra.web.component.validation.Helper;

@Path("/code/env")
@Produces("application/json")
public class CodeEnvWebService {
	
	private static final String JS_VAR_NAME = "__viewContext.primitiveValueConstraints";

	@POST
	@Path("validator")
	public JavaTypeResult<String> validatorScript(CodeEnvCommand command) {
		StringBuilder sb = new StringBuilder();
        sb.append(JS_VAR_NAME);
        sb.append(" = ");
        sb.append(JS_VAR_NAME);
        sb.append(" || {};");

        if (command.getValidator() != null) {
	        val primitives = TagContentsUtil.readMultipleLinesString(command.getValidator());
	        for(String fqnOfPrimitiveValueClass : primitives) {
	        	writePrimitiveValueConstraints(sb, fqnOfPrimitiveValueClass);
	        }
        }

        return new JavaTypeResult<>(sb.toString());
	}
	
private static void writePrimitiveValueConstraints(StringBuilder sb, String fqnOfPrimitiveValueClass) {
		
		val pvClassOptional = TagContentsUtil.findClass(fqnOfPrimitiveValueClass);
		if (!pvClassOptional.isPresent()) return;
		
		val pvClass = pvClassOptional.get();
		String pvName = pvClass.getSimpleName();
		
		sb.append("\n\t");
        sb.append(JS_VAR_NAME);
        sb.append(".");
		sb.append(pvName);
		sb.append(" = {");
		
		sb.append("\n\t\tvalueType: '");
		sb.append(Helper.getValueType(pvClass));
		sb.append("',");
		writeConstraints(sb, pvClass);
		
		sb.append("\n\t};");
	}

	private static void writeConstraints(StringBuilder sb, Class<?> pvClass) {
		
		annotationsStream(pvClass)
			.map(a -> a.toString())
			.filter(r -> r.contains(PrimitiveValueConstraintPackage.NAME) || r.contains("nts.uk.shr.com.primitive"))
	        .forEach(representationOfAnnotation -> {
	        	String constraintName = Helper.getAnnotationName(representationOfAnnotation);
	        	String parametersString = Helper.getAnnotationParametersString(representationOfAnnotation);
				writeConstraint(sb, constraintName, parametersString);
	        });
	}
	
	private static void writeConstraint(StringBuilder sb, String constraintName, String parametersString) {
		
		if (Helper.CONSTRAINTS_SIGNLE_PARAM.containsKey(constraintName)) {
			String jsName = Helper.CONSTRAINTS_SIGNLE_PARAM.get(constraintName);
			String jsValue = Helper.parseSingleParameterValue(constraintName, parametersString);
			
			writeConstraintParameter(sb, jsName, jsValue);
			
		} else if (Helper.CONSTRAINTS_MAX_MIN_PARAM.contains(constraintName)) {
			val paramsMap = Helper.parseMultipleParametersString(parametersString);

			writeConstraintParameter(sb, "max", paramsMap.get("max"));
			writeConstraintParameter(sb, "min", paramsMap.get("min"));
		}
	}

	private static void writeConstraintParameter(StringBuilder sb, String jsName, String jsValue) {
		sb.append("\n\t\t");
		sb.append(jsName);
		sb.append(": ");
		if (jsName.equals("stringExpression")) {
			sb.append(jsValue);
		} else if (jsValue.contains(":")) {
			sb.append("'");
			sb.append(jsValue);
			sb.append("'");
		} else {
			sb.append(jsValue);
		}
		sb.append(",");
	}
	
	/**
	 * Get annotations stream of pvClass and its super class.
	 * @param pvClass pvClass
	 * @return annotations stream
	 */
	private static Stream<Annotation> annotationsStream(Class<?> pvClass) {
		return Stream.concat(Arrays.asList(pvClass.getDeclaredAnnotations()).stream(), 
							Arrays.asList(pvClass.getSuperclass().getDeclaredAnnotations()).stream());
	}
}
