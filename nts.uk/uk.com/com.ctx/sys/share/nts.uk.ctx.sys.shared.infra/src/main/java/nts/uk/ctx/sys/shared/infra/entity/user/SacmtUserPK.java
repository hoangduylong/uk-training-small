package nts.uk.ctx.sys.shared.infra.entity.user;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class SacmtUserPK implements Serializable{
	 
	private static final long serialVersionUID = 1L;
	@NotNull
	@Column(name = "USER_ID")
    public String userID;
}
