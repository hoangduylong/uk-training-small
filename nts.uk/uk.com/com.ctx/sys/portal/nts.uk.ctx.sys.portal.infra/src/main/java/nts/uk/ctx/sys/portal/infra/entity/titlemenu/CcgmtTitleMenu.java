package nts.uk.ctx.sys.portal.infra.entity.titlemenu;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;


/**
 * author hieult
 */
@Entity
@Table(name = "SPTMT_TITLEMENU")
@AllArgsConstructor
@NoArgsConstructor
public class CcgmtTitleMenu extends ContractUkJpaEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public CcgmtTitleMenuPK ccgmtTitleMenuPK;

	/* Tittle name */
	@Column(name = "NAME")
	public String name;

	@Column(name = "LAYOUT_ID")
	public String layoutID;

	@Override
	protected Object getKey() {
		return ccgmtTitleMenuPK;
	}

}
