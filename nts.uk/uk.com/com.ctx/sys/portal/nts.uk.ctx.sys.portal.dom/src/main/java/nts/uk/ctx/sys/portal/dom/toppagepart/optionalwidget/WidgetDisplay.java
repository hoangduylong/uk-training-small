package nts.uk.ctx.sys.portal.dom.toppagepart.optionalwidget;

import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.uk.ctx.sys.portal.dom.toppagepart.TopPagePartCode;
import nts.uk.shr.com.enumcommon.NotUseAtr;
/**
 * ウィジェット表示項目
 * @author phongtq
 *
 */
@Getter
public class WidgetDisplay {
	/** Company ID 会社ID */
	private String companyID;

	/** */
	private String topPagePartID;

	/** Widget Code ウィジェットコード */
	private TopPagePartCode widgetCode;

	/** Enum Widget Type ウィジェット種別 */
	private WidgetDisplayItemType widgeType;
	
	private NotUseAtr useAtr;

	public static WidgetDisplay createFromJavaType(String companyID, String topPagePartID, String widgetCode,
			int widgetType, int useAtr) {
		return new WidgetDisplay(companyID, topPagePartID, new TopPagePartCode(widgetCode),
				EnumAdaptor.valueOf(widgetType, WidgetDisplayItemType.class), EnumAdaptor.valueOf(useAtr, NotUseAtr.class));
	}

	public WidgetDisplay(String companyID, String topPagePartID, TopPagePartCode widgetCode,
			WidgetDisplayItemType widgeType, NotUseAtr useAtr) {
		super();
		this.companyID = companyID;
		this.topPagePartID = topPagePartID;
		this.widgetCode = widgetCode;
		this.widgeType = widgeType;
		this.useAtr = useAtr;
	}

}
