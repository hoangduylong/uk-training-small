package nts.uk.ctx.bs.employee.infra.entity.workplace.assigned;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;
/**
 * BsymtAssiWorkplacePK
 * @author xuan vinh
 *
 */

@Getter
@Setter
@Embeddable
public class BsymtAssiWorkplacePK implements Serializable{


	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/** the assign workplace id*/
	@Column(name = "ASSI_WORKPLACE_ID")
	private String assiWorkplaceId;
	
}
