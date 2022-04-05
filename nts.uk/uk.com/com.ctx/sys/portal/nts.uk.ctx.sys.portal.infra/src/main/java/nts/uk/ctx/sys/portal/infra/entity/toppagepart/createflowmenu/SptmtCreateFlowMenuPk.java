package nts.uk.ctx.sys.portal.infra.entity.toppagepart.createflowmenu;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class SptmtCreateFlowMenuPk implements Serializable {
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
}
