package nts.uk.ctx.sys.portal.infra.entity.webmenu;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SPTMT_WEB_MENU")
public class SptmtWebMenu extends ContractUkJpaEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	public CcgstWebMenuPK ccgstWebMenuPK;
	
	@Column(name = "WEB_MENU_NAME")
	public String webMenuName;
	
	@Column(name = "DEFAULT_MENU")
	public int defaultMenu;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="webMenu", orphanRemoval = true)
	public List<SptmtMenuBar> menuBars;

	@Override
	protected Object getKey() {		
		return ccgstWebMenuPK;
	}
}
