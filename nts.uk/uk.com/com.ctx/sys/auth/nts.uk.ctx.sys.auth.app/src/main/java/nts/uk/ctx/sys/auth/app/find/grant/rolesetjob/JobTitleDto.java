package nts.uk.ctx.sys.auth.app.find.grant.rolesetjob;

import lombok.Data;

@Data
public class JobTitleDto {

	/** The position id. */
	private String id;

	/** The position code. */
	private String code;

	/** The position name. */
	private String name;

	public JobTitleDto(String id, String code, String name) {
		super();
		this.id = id;
		this.code = code;
		this.name = name;
	}
	
	
}
