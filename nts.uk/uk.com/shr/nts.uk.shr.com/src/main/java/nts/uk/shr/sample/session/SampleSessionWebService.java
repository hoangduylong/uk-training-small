package nts.uk.shr.sample.session;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import lombok.val;
import nts.arc.layer.app.command.JavaTypeResult;
import nts.arc.layer.ws.WebService;
import nts.arc.scoped.session.SessionContextProvider;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.loginuser.LoginUserContextManager;

@Path("/sample/session")
@Produces("application/json")
public class SampleSessionWebService extends WebService {
	
	@Inject
	private LoginUserContextManager lucmanager;

	@POST
	@Path("setvalue/{value}")
	public void setValue(@PathParam("value") String value) {
		SessionContextProvider.get().put("SAMPLE_SESSION", value);
	}
	
	@POST
	@Path("getvalue")
	public JavaTypeResult<String> getValue() {
		val user = AppContexts.user();
		user.toString();
		return new JavaTypeResult<>((String)SessionContextProvider.get().get("SAMPLE_SESSION"));
	}
	
	@POST
	@Path("login")
	public void login() {
		val nologin = AppContexts.user();
		nologin.toString();
		
		this.lucmanager.loggedInAsEmployee(
				"user0000",
				"person0000",
				"contract00",
				"company00",
				"1234",
				"employee00",
				"12345678");
		
		this.lucmanager.roleIdSetter()
				.forAttendance("at1")
				.forPayroll("pr1")
				.forPersonnel(null)
				.forPersonalInfo("pi1");
		
		val loggedin = AppContexts.user();
		val roles = loggedin.roles();
		roles.forAttendance();
		roles.forPayroll();
		roles.forPersonnel();
		roles.forPersonalInfo();

		loggedin.language().changeBasicLanguage("ja");
		loggedin.language().changeBasicLanguage("ja");
	}
}
