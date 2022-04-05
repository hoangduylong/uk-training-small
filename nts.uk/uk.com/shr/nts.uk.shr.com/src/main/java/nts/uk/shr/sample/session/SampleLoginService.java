package nts.uk.shr.sample.session;

import javax.ejb.Stateless;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;

@Stateless
public class SampleLoginService {

	public void login(@Context HttpServletRequest request) {
		
		request.toString();
	}
}
