package nts.uk.shr.com.security;

public interface AuthenticateContract {

	/**
	 * Return true if given code and password is valid.
	 * @param contractCode contract code
	 * @param contractPassword contract password
	 * @return result
	 */
	boolean authenticate(String contractCode, String contractPassword);
}
