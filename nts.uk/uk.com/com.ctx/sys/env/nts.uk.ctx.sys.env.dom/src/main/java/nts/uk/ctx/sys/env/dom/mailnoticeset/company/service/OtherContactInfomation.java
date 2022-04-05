package nts.uk.ctx.sys.env.dom.mailnoticeset.company.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.環境.メール通知設定.会社.service.他の連絡先情報
 * 
 * @author nws-ducnt
 *
 */
@AllArgsConstructor
@Data
@NoArgsConstructor
public class OtherContactInfomation {
	/** NO */
	private int no;

	/** 連絡先アドレス */
	private String contactAddress;

	/** 連絡先名 */
	private String contactName;
}
