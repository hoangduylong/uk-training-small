package nts.uk.ctx.sys.portal.app.command.webmenu;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
* The Class WebMenuCommand.
* @author HieuNV
*/
@NoArgsConstructor
@Data
public class WebMenuCommand {
    /** Webメニューコード */
    private String webMenuCode;

    /** Webメニュー名称 */
    private String webMenuName;
}
