package nts.uk.ctx.sys.portal.infra.entity.layout.widget;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class SptmtLayoutWidgetPK implements Serializable {
	
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	@Column(name = "CID")
	public String cid;

	@Column(name = "LAYOUT_NO")
	public BigDecimal layoutNo;

	@Column(name = "TOP_PAGE_CD")
	public String topPageCode;
	
	@Column(name = "WIDGET_TYPE")
	public BigDecimal widgetType;

}