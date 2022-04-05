package nts.uk.ctx.sys.env.pub.mailserver;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * refactor 4
 * SMTP情報
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
@Getter
public class SmtpInfoExport {
	/** The server. */
	// サーバ
	private String server;
	
	/** The port. */
	// ポート
	private Integer port;
}
