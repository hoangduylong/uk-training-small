package nts.uk.ctx.sys.env.app.find.mailnoticeset.setting;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Dto 連絡先の設定
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactSettingDto {
	/**
	 * 連絡先利用設定
	 */
	private Integer contactUsageSetting;

	/**
	 * 更新可能
	 */
	private Integer updatable;
}
