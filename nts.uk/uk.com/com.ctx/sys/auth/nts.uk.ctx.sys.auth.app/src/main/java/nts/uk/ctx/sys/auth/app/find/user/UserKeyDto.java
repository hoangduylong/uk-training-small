package nts.uk.ctx.sys.auth.app.find.user;

import lombok.Value;

@Value
public class UserKeyDto {

	private String key;

	private boolean Special;

	private boolean Multi;

	private int roleType;
}
