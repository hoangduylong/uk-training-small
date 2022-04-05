package nts.uk.ctx.sys.auth.app.find.grant.rolesetjob;


import lombok.Data;

@Data
public class RoleSetDto {
	/** ロールセットコード. */
	private String code;

	/** ロールセット名称*/
	private String name;

	public RoleSetDto(String code, String name) {
		super();
		this.code = code;
		this.name = name;
	}
	
}
