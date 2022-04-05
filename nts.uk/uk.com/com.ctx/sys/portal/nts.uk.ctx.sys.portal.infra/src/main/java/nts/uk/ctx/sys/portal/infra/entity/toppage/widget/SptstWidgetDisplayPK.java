package nts.uk.ctx.sys.portal.infra.entity.toppage.widget;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class SptstWidgetDisplayPK implements Serializable {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	/** The cid. */
	@Column(name = "CID")
	public String companyID;

	@Column(name = "WIDGET_DISPLAY_ITEM_TYPE")
	public int widgetType;
}