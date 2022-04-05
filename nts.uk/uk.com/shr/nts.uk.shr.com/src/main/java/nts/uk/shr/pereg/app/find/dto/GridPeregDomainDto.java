package nts.uk.shr.pereg.app.find.dto;

import lombok.Data;

@Data
public class GridPeregDomainDto {
	private String employeeId;
	private String personId;
	
	private PeregDomainDto peregDomainDto;
	
	public GridPeregDomainDto(String sid, String pid,PeregDomainDto domain) {
		this.employeeId = sid;
		this.personId = pid;
		this.peregDomainDto = domain;
	}
}