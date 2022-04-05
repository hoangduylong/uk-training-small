package nts.uk.ctx.sys.env.pub.mailserver;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * refactor 4
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
@Getter
public class MailServerSetExport {
	
	/**
	 * メールサーバ設定済区分
	 */
	private boolean mailServerSet;
	
	/**
	 * ドメインモデル「メールサーバ」
	 */
	private Optional<MailServerExport> opMailServerExport; 
	
}
