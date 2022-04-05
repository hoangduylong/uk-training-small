package nts.uk.ctx.sys.env.dom.mailnoticeset.company;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.環境.メール通知設定.会社.会社.他の連絡先
 */
@Getter
@Builder
@AllArgsConstructor
public class OtherContact {

	/**
	 * NO
	 */
	private int no;

	/**
	 * 連絡先利用設定
	 */
	private ContactUsageSetting contactUsageSetting;

	/**
	 * 連絡先名
	 */
	private ContactName contactName;
}
