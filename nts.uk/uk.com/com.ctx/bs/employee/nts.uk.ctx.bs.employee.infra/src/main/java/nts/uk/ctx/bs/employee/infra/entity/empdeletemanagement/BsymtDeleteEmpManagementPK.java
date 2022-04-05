package nts.uk.ctx.bs.employee.infra.entity.empdeletemanagement;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Embeddable
public class BsymtDeleteEmpManagementPK implements Serializable{

	private static final long serialVersionUID = 1L;
	
	/** The sid. */
	@Basic(optional = false)
	@Column(name="SID")
	private String sid;
	
}
