package nts.uk.ctx.sys.auth.pub.user.getuser;



import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetUserDto {
	
	private String userId;
	
	private String loginId;
	
	private Optional<String> userName;
	
	private Optional<String> associatedPersonID;
	
	private Optional<String> mailAddress;

	public GetUserDto(String userId, String loginId, String userName, String associatedPersonID,
			String mailAddress) {
		super();
		this.userId = userId;
		this.loginId = loginId;
		this.userName = Optional.ofNullable(userName == null ? null : userName);
		this.associatedPersonID = Optional.ofNullable(associatedPersonID== null ? null :associatedPersonID);
		this.mailAddress = Optional.ofNullable(mailAddress == null ? null : mailAddress);
	}
}
