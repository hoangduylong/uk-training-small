package nts.uk.ctx.sys.gateway.app.find.stopsetting;

import java.util.List;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.sys.gateway.app.find.stopsetting.stopbycompany.StopByCompanyDto;
import nts.uk.ctx.sys.gateway.app.find.stopsetting.stopbysystem.StopBySystemDto;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopByCompany;

@Getter
@Setter
public class StopSettingDto {
	
	private boolean isAdmin;

	private StopBySystemDto system;
	
	private StopByCompanyDto company;

	private List<StopByCompanyDto> stopCompanys;

	private List<StopByCompanyDto> inProgressCompanys;

	public void setStopCompanys(List<StopByCompany> stopDomains) {
		this.stopCompanys = stopDomains.stream().map(x -> StopByCompanyDto.fromDomain(x)).collect(Collectors.toList());

	}

	public void setInProgressCompanys(List<StopByCompany> inProgressDomains) {

		this.inProgressCompanys = inProgressDomains.stream().map(x -> StopByCompanyDto.fromDomain(x))
				.collect(Collectors.toList());

	}
}
