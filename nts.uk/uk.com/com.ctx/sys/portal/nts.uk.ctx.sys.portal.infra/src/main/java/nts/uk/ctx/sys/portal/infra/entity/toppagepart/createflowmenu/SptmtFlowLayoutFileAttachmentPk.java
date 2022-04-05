package nts.uk.ctx.sys.portal.infra.entity.toppagepart.createflowmenu;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
@Builder
public class SptmtFlowLayoutFileAttachmentPk implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 会社ID
	 */
	@NonNull
	@Column(name = "CID")
	public String cid;

	/**
	 * フローメニューコード
	 */
	@NonNull
	@Column(name = "FLOW_MENU_CD")
	public String flowMenuCode;

	/**
	 * column
	 */
	@Column(name = "POS_COL")
	public int column;

	/**
	 * row
	 */
	@Column(name = "POS_ROW")
	public int row;
}
