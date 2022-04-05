package nts.uk.ctx.bs.person.infra.entity.foreigner.residence.hisinfo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class PpetdForeignerResidenceHisInfoPk implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name = "HIST_ID")
	public String hisId;
}