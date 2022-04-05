package nts.uk.ctx.sys.env.dom.mailnoticeset.company.service;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import nts.arc.layer.dom.DomainObject;

import java.util.List;

/**
 * UKDesign.UniversalK.共通.CDL_共通ダイアログ.CDL010_連絡先の参照.メニュー別OCD.連絡先情報を取得する.連絡先情報を取得する.連絡先の表示設定
 */
@Getter
@Setter 
@Builder
public class ContactDisplaySetting extends DomainObject {

	/**
	 * ダイヤルイン番号を表示するか
	 */
	private boolean dialInNumberDisplay;

	/**
	 * 会社メールアドレスを表示するか
	 */
	private boolean companyEmailAddressDisplay;

	/**
	 * 会社携帯メールアドレスを表示するか
	 */
	private boolean companyMobileEmailAddressDisplay;

	/**
	 * 個人メールアドレスを表示するか
	 */
	private boolean personalEmailAddressDisplay;

	/**
	 * 個人携帯メールアドレスを表示するか
	 */
	private boolean personalMobileEmailAddressDisplay;

	/**
	 * 内線番号を表示するか
	 */
	private boolean extensionNumberDisplay;

	/**
	 * 携帯電話（会社用）を表示するか
	 */
	private boolean companyMobilePhoneDisplay;

	/**
	 * 携帯電話（個人用）を表示するか
	 */
	private boolean personalMobilePhoneDisplay;

	/**
	 * 緊急電話番号1を表示するか
	 */
	private boolean emergencyNumber1Display;

	/**
	 * 緊急電話番号2を表示するか
	 */
	private boolean emergencyNumber2Display;

	/**
	 * 他の連絡先を表示するか
	 */
	private List<OtherContactDisplaySetting> otherContacts;
}
