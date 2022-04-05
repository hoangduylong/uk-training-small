package nts.uk.ctx.bs.person.infra.entity.person.contact;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class BpsmtPersonContactPK implements Serializable{
	private static final long serialVersionUID = 1L;

	@Basic(optional = false)
	@Column(name = "PID")
	public String pid;
}
