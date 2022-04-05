package nts.uk.ctx.bs.employee.app.find.employment.dto;

import lombok.Data;

@Data
public class CommonMaterItemDto {

	private String commonMasterItemId;
	
    private String commonMasterItemName;
    
    private String commonMasterItemCD;

	public CommonMaterItemDto(String commonMasterItemId, String commonMasterItemName , String commonMasterItemCD) {
		super();
		this.commonMasterItemId = commonMasterItemId;
		this.commonMasterItemName = commonMasterItemName;
		this.commonMasterItemCD = commonMasterItemCD ;
	}
    
}
