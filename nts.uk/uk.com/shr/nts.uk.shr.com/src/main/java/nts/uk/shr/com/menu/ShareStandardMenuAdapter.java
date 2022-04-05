package nts.uk.shr.com.menu;

import java.util.Optional;

public interface ShareStandardMenuAdapter {

	boolean isEsistMenuWith(String comId, String screenId, String programId, String queryString);
	
	Optional<String> getProgramName(String comId, String screenId, String programId, String queryString);
}
