package nts.uk.ctx.sys.portal.infra.entity.toppage.widget;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.portal.dom.toppagepart.optionalwidget.WidgetDisplayItem;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SPTMT_WIDGET_DISPLAY")
public class SptmtWidgetDisplay extends ContractUkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public SptstWidgetDisplayPK sptstWidgetDisplayPK;

	@Column(name = "USE_ATR")
	public int useAtr;
	
	@Override
	protected Object getKey() {
		return sptstWidgetDisplayPK;
	}
	
	public WidgetDisplayItem toDomain() {
		return WidgetDisplayItem.createFromJavaType(sptstWidgetDisplayPK.widgetType, useAtr);
	}

}