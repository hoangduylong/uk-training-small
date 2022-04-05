package nts.uk.ctx.sys.portal.pub.standardmenu;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * （プログラムID、遷移先の画面ID、クエリ文字列（Optional））
 * 
 * @author sonnlb
 *
 */
@Data
@AllArgsConstructor
public class StandardMenuNameQuery {

	/**
	 * プログラムID
	 */
	private String programId;

	/**
	 * 遷移先の画面ID
	 */
	private String screenId;

	/**
	 * クエリ文字列
	 */
	private Optional<String> queryString;
}
