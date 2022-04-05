package nts.uk.ctx.sys.env.dom.mailnoticeset.company.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * UKDesign.UniversalK.共通.CDL_共通ダイアログ.CDL010_連絡先の参照.メニュー別OCD.連絡先情報を取得する.連絡先情報を取得する.他の連絡先の表示設定
 */
@Getter
@Builder
@AllArgsConstructor
public class OtherContactDisplaySetting {

	/**
	 * NO
	 */
	private int no;

	/**
	 * 連絡先利用設定
	 */
	private boolean contactUsageSettingDisplay;

	/**
	 * 連絡先名
	 */
	private String contactName;
}
