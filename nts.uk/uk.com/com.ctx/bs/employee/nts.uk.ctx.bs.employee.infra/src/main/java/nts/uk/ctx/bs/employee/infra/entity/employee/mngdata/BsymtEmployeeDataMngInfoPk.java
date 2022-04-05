package nts.uk.ctx.bs.employee.infra.entity.employee.mngdata;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class BsymtEmployeeDataMngInfoPk implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name = "SID")
	public String sId;

	@Column(name = "PID")
	public String pId;

}
