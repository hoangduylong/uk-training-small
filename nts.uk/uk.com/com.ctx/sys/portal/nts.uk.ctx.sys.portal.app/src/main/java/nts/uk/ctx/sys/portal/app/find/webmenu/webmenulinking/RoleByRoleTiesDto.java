package nts.uk.ctx.sys.portal.app.find.webmenu.webmenulinking;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking.RoleByRoleTies;

@Getter
@Setter
@NoArgsConstructor
public class RoleByRoleTiesDto {

    
    /**ロールID */
    private String roleId;
	/** メニューコードリスト */
    private String webMenuCd;

	public RoleByRoleTiesDto( String roleId,String webMenuCd) {
		super();
		this.roleId = roleId;
		this.webMenuCd = webMenuCd;
	}
    public static RoleByRoleTiesDto fromDomain(RoleByRoleTies domain) {
    	return new RoleByRoleTiesDto(
    			domain.getRoleId(),
    			domain.getWebMenuCd().v()
    			);
    }
}
