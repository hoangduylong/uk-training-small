package nts.uk.ctx.sys.shared.infra.entity.user;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.layer.infra.data.entity.type.GeneralDateToDBConverter;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.shared.dom.user.User;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Entity
@Table(name = "SACMT_USER")
@NoArgsConstructor
@AllArgsConstructor
public class SacmtUser extends ContractUkJpaEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	public SacmtUserPK sacmtUserPK;
	
	/** The default User */
	/** デフォルトユーザ*/
	@Column(name = "DEFAULT_USER")
	public int defaultUser;
	
	/** The login ID. */
	/** ログインID */
	@Column(name = "LOGIN_ID")
	public String loginID;
	
	/** The expiration date. */
	/** 有効期限 */
	@Column(name = "EXPIRATION_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
	@Temporal(TemporalType.DATE)
	public GeneralDate expirationDate;
	
	/** The special user. */
	/** 特別利用者 */
	@Column(name = "SPECIAL_USER")
	public int specialUser;
	
	/** The multi com. */
	/**複数会社を兼務する */
	@Column(name = "MULTI_COM")
	public int multiCompanyConcurrent;
	
	/** The mail add. */
	/** メールアドレス*/
	@Column(name = "MAIL_ADD")
	public String mailAdd;
	
	/**ユーザ名 */
	/** The user name. */
	@Column(name = "USER_NAME")
	public String userName;
	
	/** 紐付け先個人ID*/
	/** The asso sid. */
	@Column(name = "ASSO_PID")
	public String associatedPersonID;
	
	@Override
	protected Object getKey() {
		return sacmtUserPK;
	}
	
	public User toDomain() {
		boolean defaultUser = this.defaultUser == 1;
		return User.createFromJavatype(
				this.sacmtUserPK.userID, 
				defaultUser, 
				this.loginID, 
				this.contractCd, 
				this.expirationDate, 
				this.specialUser, 
				this.multiCompanyConcurrent, 
				this.mailAdd, 
				this.userName, 
				this.associatedPersonID
				);
	}
	
	public static SacmtUser toEntity(User user) {
		int isDefaultUser = user.isDefaultUser() ? 1 : 0;
		return new SacmtUser(
				new SacmtUserPK(user.getUserID()), 
				isDefaultUser, 
				user.getLoginID().v(), 
				user.getExpirationDate(), 
				user.getSpecialUser().value,
				user.getMultiCompanyConcurrent().value,
				user.getMailAddress().isPresent() ? user.getMailAddress().get().v():null,
				user.getUserName().isPresent() ? user.getUserName().get().v() : null,
				user.getAssociatedPersonID().isPresent() ? user.getAssociatedPersonID().get() : null);
	}
}