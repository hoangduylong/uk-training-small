package nts.uk.ctx.sys.auth.pub.user;

/**
 * The Interface CheckBeforePasswordPublisher.
 */
public interface CheckBeforePasswordPublisher {
	
	/**
	 * Password policy check for submit.
	 *
	 * @param userId the user id
	 * @param newPass the new pass
	 * @param contractCode the contract code
	 * @return the check before change pass output
	 */
	//check passPolicyforSubmit
	CheckBeforeChangePassOutput passwordPolicyCheckForSubmit(String userId, String newPass, String contractCode);
}
