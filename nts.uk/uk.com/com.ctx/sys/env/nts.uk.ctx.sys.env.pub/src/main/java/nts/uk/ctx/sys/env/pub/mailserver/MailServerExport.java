package nts.uk.ctx.sys.env.pub.mailserver;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * refactor 4
 * メールサーバー
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
@Getter
public class MailServerExport {
	/** The company id. */
	// 会社ID
	private String companyId;

	/** The use authentication. */
	// メール送信認証
	private Integer useAuthentication;

	/** The encryption method. */
	// 暗号化方式
	private Integer encryptionMethod;

	/** The authentication method. */
	// 認証方式
	private Integer authenticationMethod;

	/** The email authentication. */
	// 認証用メールアドレス
	private String emailAuthentication;

	/** The password. */
	// パスワード
	private String password;

	/** The smtp info. */
	// SMTP情報
	private SmtpInfoExport smtpInfo;

	/** The pop info. */
	// POP情報
	private PopInfoExport popInfo;

	/** The imap info. */
	// IMAP情報
	private ImapInfoExport imapInfo;
}
