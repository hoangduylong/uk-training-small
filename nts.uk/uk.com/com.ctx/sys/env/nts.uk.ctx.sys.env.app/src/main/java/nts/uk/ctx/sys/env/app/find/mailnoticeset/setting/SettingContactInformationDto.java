package nts.uk.ctx.sys.env.app.find.mailnoticeset.setting;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Dto 連絡先情報の設定
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SettingContactInformationDto {

	/**
	 * ダイヤルイン番号
	 */
	private ContactSettingDto dialInNumber;

	/**
	 * 会社メールアドレス
	 */
	private ContactSettingDto companyEmailAddress;

	/**
	 * 会社携帯メールアドレス
	 */
	private ContactSettingDto companyMobileEmailAddress;

	/**
	 * 個人メールアドレス
	 */
	private ContactSettingDto personalEmailAddress;

	/**
	 * 個人携帯メールアドレス
	 */
	private ContactSettingDto personalMobileEmailAddress;

	/**
	 * 内線番号
	 */
	private ContactSettingDto extensionNumber;

	/**
	 * 携帯電話（会社用）
	 */
	private ContactSettingDto companyMobilePhone;

	/**
	 * 携帯電話（個人用）
	 */
	private ContactSettingDto personalMobilePhone;

	/**
	 * 緊急電話番号1
	 */
	private ContactSettingDto emergencyNumber1;

	/**
	 * 緊急電話番号2
	 */
	private ContactSettingDto emergencyNumber2;

	/**
	 * 他の連絡先
	 */
	private List<OtherContactDto> otherContacts;
}
