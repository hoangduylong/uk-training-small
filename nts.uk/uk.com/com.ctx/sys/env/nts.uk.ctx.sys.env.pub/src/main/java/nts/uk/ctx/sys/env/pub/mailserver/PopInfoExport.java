package nts.uk.ctx.sys.env.pub.mailserver;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * refactor 4
 * POP情報
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
@Getter
public class PopInfoExport {
	/** The server. */
	// サーバ
	private String server;
	
	/** The use server. */
	// サーバ使用
	private Integer useServer;
	
	/** The port. */
	// ポート
	private Integer port;
}
