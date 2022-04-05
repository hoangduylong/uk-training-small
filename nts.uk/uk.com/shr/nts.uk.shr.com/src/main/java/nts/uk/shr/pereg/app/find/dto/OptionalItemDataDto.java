package nts.uk.shr.pereg.app.find.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OptionalItemDataDto {

	protected String recordId;
	
	protected String perInfoCtgCd;
	
	protected String perInfoCtgId;
	
	protected String itemCode;

	protected String perInfoItemDefId;

	protected String itemName;

	protected int dataType;

	protected Object value;

	protected boolean required;

}
