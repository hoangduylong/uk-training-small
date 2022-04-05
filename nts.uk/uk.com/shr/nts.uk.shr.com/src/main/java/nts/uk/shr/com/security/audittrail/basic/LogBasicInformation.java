package nts.uk.shr.com.security.audittrail.basic;

import java.util.Optional;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.arc.time.GeneralDateTime;
import nts.uk.shr.com.context.ScreenIdentifier;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;
import nts.uk.shr.com.security.audittrail.correction.content.UserInfo;

/**
 * ログ基本情報
 */
@RequiredArgsConstructor
@Getter
public class LogBasicInformation {

	/** 操作ID */
	private final String operationId;
	
	/** 会社ID */
	private final String companyId;
	
	/** ログインユーザ */
	private final UserInfo userInfo;
	
	/** ログイン情報 */
	private final LoginInformation loginInformation;
	
	/** 修正日時 */
	private final GeneralDateTime modifiedDateTime;
	
	/** 権限情報 */
	private final LoginUserRoles authorityInformation;
	
	/** 対象プログラム */
	private final ScreenIdentifier targetProgram;
	
	/** 備考 */
	private final Optional<String> note;
	
}
