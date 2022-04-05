package nts.uk.shr.infra.web.security.relaylogin;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import lombok.val;
import nts.arc.security.ticket.DataTicket;
import nts.uk.shr.infra.web.ResourceLocation;
import nts.uk.shr.infra.web.component.filetag.ScriptFile;
import nts.uk.shr.infra.web.security.relaylogin.RelayLoginInfo.ExpiredTicketException;
import nts.uk.shr.infra.web.security.relaylogin.RelayLoginInfo.InvalidTicketException;

@Path("public/relaylogin")
public class RelayLoginPageWebService {

	@GET
	@Path("relaypage/{relayInfo}")
	@Produces("text/html")
	public String relayPage(@PathParam("relayInfo") String serializedRelayInfo) {
		
		RelayLoginInfo relayInfo;
		try {
			relayInfo = RelayLoginInfo.fromTicket(serializedRelayInfo);
		} catch (InvalidTicketException e) {
			return htmlError();
		} catch (ExpiredTicketException e) {
			return htmlError();
		}
		
		val ticket = DataTicket.issueNewTicket(relayInfo, 5000);
		return html(ticket.serialize());
	}

	private static String html(String relayInfo) {
		val html = new StringBuilder();
		
		html.append("<!DOCTYPE html>")
			.append("<html>")
			.append("<head>");
		
		htmlBasicScripts(html);
		htmlLoginScript(html, relayInfo);
		
		html.append("</head>")
			.append("<body></body>")
			.append("</html>");
		
		return html.toString();
	}
	
	private static void htmlBasicScripts(StringBuilder html) {
		val location = new ResourceLocation();
		ScriptFile.FILES_BASIC.forEach(file -> {
			html.append("<script src=\"")
				.append(location.absolutePathTo(file))
				.append("\"></script>");
		});
	}
	
	private static void htmlLoginScript(StringBuilder html, String relayInfo) {
		html.append("<script>")
			.append("nts.uk.request.specials.relayLogin('").append(relayInfo).append("');")
			.append("</script>");
	}
	
	private static String htmlError() {
		val html = new StringBuilder();
		
		html.append("<!DOCTYPE html>")
			.append("<html>")
			.append("</html>");
		
		return html.toString();
	}
}
