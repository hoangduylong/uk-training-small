package nts.uk.ctx.bs.employee.infra.entity.employee.contact;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class BsymtEmpInfoContactPK implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Basic(optional = false)
	@Column(name = "SID")
	public String sid;
}
