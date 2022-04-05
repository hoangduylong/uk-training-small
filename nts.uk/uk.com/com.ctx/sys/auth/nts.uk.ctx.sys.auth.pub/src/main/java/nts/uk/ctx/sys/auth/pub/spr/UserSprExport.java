package nts.uk.ctx.sys.auth.pub.spr;

import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Getter;
/**
 * ユーザ
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
@Getter

public class UserSprExport {
	
	// ID 
	/** The user id. */
	private String userID;
	
	// ログインID
	/** The login id. */
	private String loginID;
	
	// ユーザ名
	/** The user name. */
	private Optional<String> userName;
	
	// 紐付け先個人ID
	/** The associated employee id. */
	private Optional<String> associatedPersonID;
	
	// メールアドレス
	/** The mail address. */
	private Optional<String> mailAddress;
	
	public UserSprExport(String userID, String loginID,String userName, String associatedPersonID,
			String mailAddress) {
		super();
		this.userID = userID;
		this.loginID = loginID;
		this.userName = Optional.ofNullable(userName == null ? null : userName);
		this.associatedPersonID = Optional.ofNullable(associatedPersonID == null ? null : associatedPersonID);
		this.mailAddress =  Optional.ofNullable(mailAddress == null ? null : mailAddress);
	}
}
