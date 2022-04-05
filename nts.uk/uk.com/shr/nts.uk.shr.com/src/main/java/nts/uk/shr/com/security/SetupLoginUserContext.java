package nts.uk.shr.com.security;

public interface SetupLoginUserContext {

	void setup(String contractCode, String companyId, String userId) throws UserNotFoundException;
	
	public static class UserNotFoundException extends Exception {

		/** serialVersionUID */
		private static final long serialVersionUID = 1L;
		
	}
}
