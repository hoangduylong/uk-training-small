package nts.uk.ctx.sys.portal.infra.entity.webmenu.jobtitletying;

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
/**
 * @author yennth
 */
@Entity
@Table(name = "CCGST_JOB_TITLE_TYING")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CcgstJobTitleTying extends ContractUkJpaEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	public CcgstJobTitleTyingPK ccgstJobTitleTyingPK;
	
	/** The web menu code. */
	@Column(name = "WEB_MENU_CD")
	public String webMenuCode;
	
	@Override
	protected CcgstJobTitleTyingPK getKey() {
		return this.ccgstJobTitleTyingPK;
	}
}
