package nts.uk.shr.pereg.app.find.dto;

import lombok.Data;

@Data
public class GridPeregDto {
	private String employeeId;
	private String personId;
	
	private PeregDto peregDto;
	
	public GridPeregDto(String employeeId, String personId, PeregDto peregDto) {
		this.employeeId = employeeId;
		this.personId = personId;
		
		this.peregDto = peregDto;
	}
}
