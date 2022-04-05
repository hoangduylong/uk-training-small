package nts.uk.shr.infra.web.security.relaylogin;

import lombok.Value;
import nts.arc.security.ticket.DataTicket;
import nts.arc.time.GeneralDateTime;

@Value
public class RelayLoginInfo {

	private final String companyId;
	private final String userId;
	private final String pathToJump;
	
	public static RelayLoginInfo fromTicket(String serializedTicket) throws InvalidTicketException, ExpiredTicketException {
		DataTicket ticket;
		try {
			ticket = DataTicket.restore(serializedTicket);
		} catch (Exception ex) {
			throw new InvalidTicketException();
		}
		
		if (!ticket.isValidAt(GeneralDateTime.now())) {
			throw new ExpiredTicketException();
		}

		return ticket.getData();
	}
	
	public static class InvalidTicketException extends Exception {

		/** serialVersionUID */
		private static final long serialVersionUID = 1L;
	}
	
	public static class ExpiredTicketException extends Exception {

		/** serialVersionUID */
		private static final long serialVersionUID = 1L;
	}
}
