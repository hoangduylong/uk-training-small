package nts.uk.shr.infra.diagnose;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.uk.shr.infra.application.ApplicationInitializer;

@Path("diagnosis")
@Produces("application/json")
public class DiagnosisWebService {
	
	@Inject
	ApplicationInitializer applicationInitializer;

	@POST
	@Path("setting/get")
	public DiagnosisSetting get() {
		return DiagnosisSetting.currentSetting();
	}
	
	@POST
	@Path("setting/update")
	public void update(DiagnosisSetting setting) {
		setting.apply();
	}
	
	@POST
	@Path("application/reinit")
	public void reinit() {
		this.applicationInitializer.reinitialize();
	}
	
}
