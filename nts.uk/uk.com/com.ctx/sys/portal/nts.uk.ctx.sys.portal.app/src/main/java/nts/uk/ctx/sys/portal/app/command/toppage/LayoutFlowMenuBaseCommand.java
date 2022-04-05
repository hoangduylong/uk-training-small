package nts.uk.ctx.sys.portal.app.command.toppage;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.sys.portal.dom.layout.WidgetSetting;

@Getter
@Setter
public class LayoutFlowMenuBaseCommand {
	
	/** ウィジェット設定 */
	private List<WidgetSetting> widgetSettings;
	/** トップページコード */
	private String topPageCode;
	/** レイアウトNO */
	private int layoutNo;
	/** レイアウト種類 */
	private Integer layoutType;
	/** 会社ID */
	private String cid;
	/** フローメニューコード */
	private String flowMenuCd;
	/** フローメニューコード（アップロード） */
	private String flowMenuUpCd;
	/** 外部URL */
	private String url;

}
