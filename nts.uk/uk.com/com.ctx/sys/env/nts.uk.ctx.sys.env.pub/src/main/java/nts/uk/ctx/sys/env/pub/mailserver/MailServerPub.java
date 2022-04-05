package nts.uk.ctx.sys.env.pub.mailserver;

public interface MailServerPub {
	boolean findBy(String companyId);
	
	/**
	 * refactor 4
	 * UKDesign.ドメインモデル."NittsuSystem.UniversalK".システム.環境.メールサーバ.アルゴリズム.メールサーバを設定したかチェックする.メールサーバを設定したかチェックする
	 * @param companyID
	 * @return
	 */
	public MailServerSetExport checkMailServerSet(String companyID); 
}
