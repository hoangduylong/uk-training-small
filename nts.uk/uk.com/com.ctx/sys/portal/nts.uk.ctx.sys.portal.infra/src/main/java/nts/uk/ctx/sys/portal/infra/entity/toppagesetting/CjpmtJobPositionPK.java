package nts.uk.ctx.sys.portal.infra.entity.toppagesetting;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
/**
 * 
 * @author hoatt
 *
 */
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class CjpmtJobPositionPK implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/** Id */
	@Column(name = "ID")
	public String id;
}
