package nts.uk.ctx.sys.env.app.command.mailnoticeset.company;

import lombok.Data;
import nts.uk.ctx.sys.env.app.find.mailnoticeset.setting.UserInformationUseMethodDto;
import nts.uk.ctx.sys.env.dom.mailnoticeset.company.UserInformationUseMethod;

/**
 * 
 * @author admin
 *
 */
@Data
public class UserInformationUseMethodSaveCommand {
	
	/**
	 * DTO ユーザー情報の使用方法  
	 */
	private UserInformationUseMethodDto userInformationUseMethodDto;
	
	public UserInformationUseMethod toDomain() {
		return UserInformationUseMethod.createFromMemento(this.userInformationUseMethodDto);
	}
}
