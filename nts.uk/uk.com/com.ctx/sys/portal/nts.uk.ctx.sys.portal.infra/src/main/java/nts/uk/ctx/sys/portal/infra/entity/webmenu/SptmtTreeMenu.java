package nts.uk.ctx.sys.portal.infra.entity.webmenu;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "SPTMT_TREE_MENU")
public class SptmtTreeMenu extends ContractUkJpaEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	public CcgstTreeMenuPK ccgstTreeMenuPK;
	
	@Column(name = "CODE")
	public String code;
	
	@Column(name = "MENU_CLS")
	public int classification;
	
	@Column(name = "SYSTEM")
	public int system;

	@ManyToOne
	@JoinColumns( {
        @JoinColumn(name = "CID", referencedColumnName = "CID", insertable = false, updatable = false),
        @JoinColumn(name = "WEB_MENU_CD", referencedColumnName = "WEB_MENU_CD", insertable = false, updatable = false),
        @JoinColumn(name = "TITLE_BAR_ID", referencedColumnName = "TITLE_BAR_ID", insertable = false, updatable = false),
        @JoinColumn(name = "MENU_BAR_ID", referencedColumnName = "MENU_BAR_ID", insertable = false, updatable = false)
    })
	public SptmtTitleBar titleMenu;
	
	@Override
	protected Object getKey() {
		
		return ccgstTreeMenuPK;
	}

	public SptmtTreeMenu(CcgstTreeMenuPK ccgstTreeMenuPK, String code, int classification, int system) {
		super();
		this.ccgstTreeMenuPK = ccgstTreeMenuPK;
		this.code = code;
		this.classification = classification;
		this.system = system;
	}
  
}
