package nts.uk.ctx.bs.employee.infra.entity.employee.history;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class BsymtAffCompanyHistPk implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name = "PID")
	public String pId;

	@Column(name = "SID")
	public String sId;

	@Column(name = "HIST_ID")
	public String historyId;
}
