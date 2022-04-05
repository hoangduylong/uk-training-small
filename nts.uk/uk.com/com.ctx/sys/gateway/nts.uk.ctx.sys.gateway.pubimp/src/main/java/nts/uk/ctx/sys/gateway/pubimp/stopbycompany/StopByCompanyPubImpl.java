package nts.uk.ctx.sys.gateway.pubimp.stopbycompany;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.gateway.app.command.systemsuspend.SystemSuspendService;
import nts.uk.ctx.sys.gateway.app.command.systemsuspend.UsageStopOutput;
import nts.uk.ctx.sys.gateway.pub.stopbycompany.StopByCompanyPub;
import nts.uk.ctx.sys.gateway.pub.stopbycompany.UsageStopOutputExport;

/**
 * The Class StopByCompanyPubImpl.
 */
@Stateless
public class StopByCompanyPubImpl implements StopByCompanyPub {

	/** The repo. */
	@Inject
	private SystemSuspendService service;
	
	/**
	 * Check usage stop.
	 *
	 * @param contractCd the contract cd
	 * @param companyCd the company cd
	 * @return the usage stop output export
	 */
	@Override
	public UsageStopOutputExport checkUsageStop(String contractCd, String companyCd) {
		UsageStopOutput usageStopOutput = this.service.checkUsageStop(contractCd, companyCd);
		return UsageStopOutputExport.builder()
				.stopMode(usageStopOutput.getStopMode().value)
				.isUsageStop(usageStopOutput.isUsageStop())
				.stopMessage(usageStopOutput.getStopMessage())
				.build();
	}

}
