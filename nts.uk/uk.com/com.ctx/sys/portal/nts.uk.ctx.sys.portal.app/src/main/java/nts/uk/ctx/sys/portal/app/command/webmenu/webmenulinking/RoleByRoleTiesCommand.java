package nts.uk.ctx.sys.portal.app.command.webmenu.webmenulinking;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleByRoleTiesCommand {

    
    /**ロールID */
    private String roleId;
	/** メニューコードリスト :WebMenuCode*/
    private String webMenuCd;
}
