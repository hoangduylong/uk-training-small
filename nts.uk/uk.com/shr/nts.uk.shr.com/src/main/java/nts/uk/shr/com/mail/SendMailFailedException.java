package nts.uk.shr.com.mail;

import nts.arc.error.BusinessException;

public class SendMailFailedException extends BusinessException {

	private final Cause cause;
	
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	
	private SendMailFailedException(Cause cause) {
		super("Msg_1057");
		
		this.cause = cause;
	}
	
	public static SendMailFailedException asNoSetting() {
		return new SendMailFailedException(Cause.NO_SETTING);
	}

	public static SendMailFailedException asCannotConnectSmtpServer() {
		return new SendMailFailedException(Cause.CANNOT_CONNECT_SMTP_SERVER);
	}

	public static SendMailFailedException asCannotConnectAuthServer() {
		return new SendMailFailedException(Cause.CANNOT_CONNECT_AUTH_SERVER);
	}

	public static SendMailFailedException asAuthenticationFailed() {
		return new SendMailFailedException(Cause.AUTHENTICATION_FAILED);
	}
	
	public boolean noSetting() {
		return this.cause == Cause.NO_SETTING;
	}
	
	public boolean cannotConnectSmtpServer() {
		return this.cause == Cause.CANNOT_CONNECT_SMTP_SERVER;
	}

	public boolean cannotConnectAuthServer() {
		return this.cause == Cause.CANNOT_CONNECT_AUTH_SERVER;
	}
	
	public boolean authenticationFailed() {
		return this.cause == Cause.AUTHENTICATION_FAILED;
	}
	
	enum Cause {
		NO_SETTING,
		CANNOT_CONNECT_SMTP_SERVER,
		CANNOT_CONNECT_AUTH_SERVER,
		AUTHENTICATION_FAILED,
	}
}
