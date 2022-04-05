package nts.uk.ctx.sys.env.app.find.mailnoticeset.setting;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Dto 他の連絡先
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OtherContactDto {
	/**
	 * NO
	 */
	private Integer no;

	/**
	 * 連絡先利用設定
	 */
	private Integer contactUsageSetting;

	/**
	 * 連絡先名
	 */
	private String contactName;
}
