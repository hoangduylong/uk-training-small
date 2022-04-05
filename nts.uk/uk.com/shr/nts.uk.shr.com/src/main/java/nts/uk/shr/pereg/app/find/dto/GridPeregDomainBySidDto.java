package nts.uk.shr.pereg.app.find.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class GridPeregDomainBySidDto {
	private String employeeId;
	private String personId;
	private List<PeregDomainDto> peregDomainDto = new ArrayList<PeregDomainDto>();
	
	public GridPeregDomainBySidDto(String sid, String pid, List<PeregDomainDto> domains) {
		this.employeeId = sid;
		this.personId = pid;
		this.peregDomainDto.addAll(domains);
	}
}
