package nts.uk.ctx.sys.auth.app.find.registration.user;

import lombok.Value;
import nts.uk.ctx.sys.shared.dom.user.User;

/* (non-Javadoc)
 * @see java.lang.Object#toString()
 */
@Value
public class UserDto {
	 
	// ログインID
	/** The login ID. */
	private String loginID;
	// ユーザ名
	/** The user name. */
	private String userName;
	// ユーザID
	/** The user ID. */
	private String userID;
	// 契約コード
	/** The contract code. */
	private String contractCode;
	// 有効期間
	/** The expiration date. */
	private String expirationDate;
	// 特別利用者
	/** The special user. */
	private Boolean specialUser;
	// 複数会社を兼務する
	/** The multi company concurrent. */
	private Boolean multiCompanyConcurrent;
	// メールアドレス
	/** The mail address. */
	private String mailAddress;
	// 個人ID
	/** The associated employee id. */
	private String associatedPersonID;
	/** The company id. */
	// CID
	private String cid;

	/**
	 * From domain.
	 *
	 * @param domain the domain
	 * @return the user dto
	 */
	public static UserDto fromDomain(User domain, String cid) {
		String userName = "";
		String mailAddress = "";
		String personId = null;
		if(domain.getUserName().isPresent())
			userName = domain.getUserName().get().toString();
		if(domain.getMailAddress().isPresent())
			mailAddress = domain.getMailAddress().get().toString();
		if(domain.getAssociatedPersonID().isPresent())
			personId = domain.getAssociatedPersonID().get().toString();
		return new UserDto(domain.getLoginID().toString(), userName, domain.getUserID(),
				domain.getContractCode().toString(), domain.getExpirationDate().toString(), Boolean.valueOf(domain.getSpecialUser().toString()),
				Boolean.valueOf(domain.getMultiCompanyConcurrent().toString()), mailAddress, personId, cid);
	}
	
	/**
	 * Instantiates a new user dto.
	 *
	 * @param loginID the login ID
	 * @param userName the user name
	 * @param userID the user ID
	 * @param contractCode the contract code
	 * @param expirationDate the expiration date
	 * @param specialUser the special user
	 * @param multiCompanyConcurrent the multi company concurrent
	 * @param mailAddress the mail address
	 * @param associatedPersonID the associated person ID
	 */
	public UserDto(String loginID, String userName, String userID, String contractCode,
			String expirationDate, Boolean specialUser, Boolean multiCompanyConcurrent, String mailAddress,
			String associatedPersonID, String cid) {
		super();
		this.loginID = loginID;
		this.userName = userName;
		this.userID = userID;
		this.contractCode = contractCode;
		this.expirationDate = expirationDate;
		this.specialUser = specialUser;
		this.multiCompanyConcurrent = multiCompanyConcurrent;
		this.mailAddress = mailAddress;
		this.associatedPersonID = associatedPersonID;
		this.cid = cid;
	}
}
