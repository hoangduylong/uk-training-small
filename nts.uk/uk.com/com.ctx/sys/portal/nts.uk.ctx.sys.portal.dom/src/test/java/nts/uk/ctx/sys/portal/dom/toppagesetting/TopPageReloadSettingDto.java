package nts.uk.ctx.sys.portal.dom.toppagesetting;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Data;
import nts.uk.ctx.sys.portal.dom.toppage.TopPageReloadSetting;

@Data
@Builder
public class TopPageReloadSettingDto implements TopPageReloadSetting.MementoGetter , TopPageReloadSetting.MementoSetter {
	/** 会社ID */
	private String cid;

	/** リロード間隔 */
	private BigDecimal reloadInterval;
}
