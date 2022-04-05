package nts.uk.ctx.sys.portal.infra.entity.toppagesetting;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "SPTMT_TOPPAGE_SELF")
public class CcgptTopPageSelfSet extends ContractUkJpaEntity implements Serializable{
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public CcgptTopPageSelfSetPK ccgptTopPageSelfSetPK;	

	/** The code. */
	@Column(name = "CODE")
	public String code;
	
	@Override
	protected Object getKey() {
		return ccgptTopPageSelfSetPK;
	}
}
