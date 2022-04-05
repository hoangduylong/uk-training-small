package nts.uk.ctx.sys.gateway.pub.stopbycompany;

/**
 * The Interface StopByCompanyPub.
 */
public interface StopByCompanyPub {
	
	/**
	 * Check usage stop.
	 *
	 * @param contractCd the contract cd
	 * @param companyCd the company cd
	 * @return the usage stop output export
	 */
	public UsageStopOutputExport checkUsageStop(String contractCd, String companyCd);
}
