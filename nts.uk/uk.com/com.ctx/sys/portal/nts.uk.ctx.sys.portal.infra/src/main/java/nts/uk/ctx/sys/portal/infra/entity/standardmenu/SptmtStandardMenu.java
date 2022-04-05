package nts.uk.ctx.sys.portal.infra.entity.standardmenu;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SPTMT_STANDARD_MENU")
public class SptmtStandardMenu extends ContractUkJpaEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public CcgstStandardMenuPK ccgmtStandardMenuPK;
	
	/** The Target Items. */
	@Column(name = "TARGET_ITEMS")
	public String targetItems;
	
	/** The Display Name. */
	@Column(name = "DISPLAY_NAME")
	public String displayName;
	
	/** The Display Order. */
	@Column(name = "DISPLAY_ORDER")
	public int displayOrder;
	
	/** The menuAtr. */
	@Column(name = "MENU_ATR")
	public int menuAtr;
	
	/** The url. */
	@Column(name = "URL")
	public String url;
	
	/** The webMenuSetting. */
	@Column(name = "WEB_MENU_SETTING")
	public int webMenuSetting;
	
	/** The afterLoginDisplay. */
	@Column(name = "AFTER_LOGIN_DISPLAY")
	public int afterLoginDisplay;
	
	/** Program ID */
	@Column(name = "PROGRAM_ID")
	public String programId;
	
	/** Screen ID */
	@Column(name = "SCREEN_ID")
	public String screenID;
	
	/** Query string */
	@Column(name = "QUERY_STRING")
	public String queryString;
	
	/**
	 * ログイン履歴表示区分
	 */
	@Basic(optional=false)
	@Column(name = "LOG_LOGIN_DISPLAY")
    public int logLoginDisplay;
	
	/**
	 * 起動履歴表示区分
	 */
	@Basic(optional=false)
	@Column(name = "LOG_START_DISPLAY")
    public int logStartDisplay;
	
	/**
	 * 修正履歴表示区分
	 */
	@Basic(optional=false)
	@Column(name = "LOG_UPDATE_DISPLAY")
    public int logUpdateDisplay;

	@Override
	protected CcgstStandardMenuPK getKey() {
		return this.ccgmtStandardMenuPK;
	}
}
