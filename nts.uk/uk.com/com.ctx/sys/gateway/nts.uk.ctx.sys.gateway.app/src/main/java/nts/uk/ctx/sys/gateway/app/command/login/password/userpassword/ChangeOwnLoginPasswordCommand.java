package nts.uk.ctx.sys.gateway.app.command.login.password.userpassword;

import lombok.Data;

@Data
public class ChangeOwnLoginPasswordCommand {
	
	/* 現行のパスワード */
	private String currentPassword;
	
	/* 新しいパスワード */
	private String newPassword;
	
	/* 新しいパスワード（確認） */
	private String confirmPassword;
}
