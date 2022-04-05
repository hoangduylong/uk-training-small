package nts.uk.ctx.sys.auth.app.find.user;
import lombok.Value;
import nts.uk.ctx.sys.shared.dom.user.SearchUser;
import nts.uk.ctx.sys.shared.dom.user.User;

@Value

public class UserDto {
	
 private String userID;
 
 private String loginID;
 
 private String userName;

 

 
 public static UserDto fromDomain(User domain){
	 return new  UserDto (
			 domain.getUserID(),
			 domain.getLoginID().v(),
			 domain.getUserName().isPresent() ? domain.getUserName().get().v() : "");
 }

 public static UserDto objDomain(SearchUser domain){
	 return new  UserDto (
			 domain.getUserID(),
			 domain.getLoginID(),
			 domain.getUserName());
 }

}
