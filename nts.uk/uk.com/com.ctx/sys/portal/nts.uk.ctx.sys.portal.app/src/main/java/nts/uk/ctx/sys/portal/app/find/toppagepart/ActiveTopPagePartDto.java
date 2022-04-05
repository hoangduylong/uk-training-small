package nts.uk.ctx.sys.portal.app.find.toppagepart;

import java.util.List;

import lombok.Value;
import nts.arc.enums.EnumConstant;

/**
 * @author LamDT
 */
@Value
public class ActiveTopPagePartDto {
	
	/** List TopPagePart Type */
	private List<EnumConstant> listTopPagePartType;
	
	/** List TopPagePart */
	private List<TopPagePartDto> listTopPagePart;
	
}