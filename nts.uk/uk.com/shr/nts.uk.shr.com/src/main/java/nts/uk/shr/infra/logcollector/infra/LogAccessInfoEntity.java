package nts.uk.shr.infra.logcollector.infra;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * Log access info entity
 * 
 * @author manhnd
 */
@Entity
@Table(name = "CLCMT_LOG_ACCESS_INFO")
@AllArgsConstructor
@NoArgsConstructor
public class LogAccessInfoEntity implements Serializable {
	
	/***/
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public LogAccessInfoEntityPK id;
	
	@Column(name = "PASSWORD")
	public String password;
	
	@Column(name = "LOCATION")
	public String location;

}