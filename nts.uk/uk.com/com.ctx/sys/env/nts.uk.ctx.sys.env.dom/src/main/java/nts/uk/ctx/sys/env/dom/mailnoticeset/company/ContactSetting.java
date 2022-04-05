package nts.uk.ctx.sys.env.dom.mailnoticeset.company;

import lombok.Builder;
import lombok.Getter;
import nts.uk.shr.com.enumcommon.NotUseAtr;

import java.util.Optional;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.環境.メール通知設定.会社.会社.連絡先の設定
 */
@Getter
@Builder
public class ContactSetting {

	/**
	 * 連絡先利用設定
	 */
	private ContactUsageSetting contactUsageSetting;

	/**
	 * 更新可能
	 */
	private Optional<NotUseAtr> updatable;
}
