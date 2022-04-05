package nts.uk.shr.infra.logcollector.infra;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class LogAccessInfoEntityPK implements Serializable {
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	
	@Column(name = "DOMAIN")
	public String domain;
	
	@Column(name = "HOST")
	public String host;
	
	@Column(name = "USER_NAME")
	public String userName;
}
