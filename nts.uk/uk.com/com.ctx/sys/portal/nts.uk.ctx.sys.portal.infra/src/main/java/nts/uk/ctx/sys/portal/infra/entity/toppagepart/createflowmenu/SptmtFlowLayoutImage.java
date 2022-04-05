package nts.uk.ctx.sys.portal.infra.entity.toppagepart.createflowmenu;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

/**
 *フローメニューレイアウトの画像設定																																					
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "SPTMT_FLOW_LAYOUT_IMG")
public class SptmtFlowLayoutImage extends UkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	private SptmtFlowLayoutImagePk pk;
	
	/**
	 * 契約コード									
	 */
	@Basic(optional = false)
	@Column(name = "CONTRACT_CD")
	private String contractCode;
	
	/**
	 * 画像ファイルID																								
	 */
	@Basic(optional = true)
	@Column(name = "IMG_FILE_ID")
	private String fileId;
	
	/**
	 * 画像ファイル名																	
	 */
	@Basic(optional = true)
	@Column(name = "IMG_FILE_NAME")
	private String fileName;
	
	/**
	 * 既定区分
	 */
	@Basic(optional = false)
	@Column(name = "DEFAULT_ATR")
	private int isFixed;
	
	/**
	 * 比率
	 */
	@Basic(optional = false)
	@Column(name = "RATIO")
	private double ratio;
	
	/**
	 * width
	 */
	@Basic(optional = false)
	@Column(name = "WIDTH")
	private int width;
	
	/**
	 * height
	 */
	@Basic(optional = false)
	@Column(name = "HEIGHT")
	private int height;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumns({
			@JoinColumn(name = "CID", referencedColumnName = "CID", insertable = false, updatable = false),
			@JoinColumn(name = "FLOW_MENU_CD", referencedColumnName = "FLOW_MENU_CD", insertable = false, updatable = false) })
	private SptmtCreateFlowMenu flowMenu;
	
	@Override
	protected Object getKey() {
		return pk;
	}
}
