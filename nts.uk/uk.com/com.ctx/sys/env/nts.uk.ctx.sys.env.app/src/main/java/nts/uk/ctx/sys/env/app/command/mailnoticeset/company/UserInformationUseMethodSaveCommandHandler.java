package nts.uk.ctx.sys.env.app.command.mailnoticeset.company;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.env.app.find.mailnoticeset.setting.UserInformationUseMethodDto;
import nts.uk.ctx.sys.env.dom.mailnoticeset.company.UserInformationUseMethod;
import nts.uk.ctx.sys.env.dom.mailnoticeset.company.UserInformationUseMethodRepository;

/**
 * Command ユーザ情報の使用方法を変更する, ユーザ情報の使用方法を追加する 
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class UserInformationUseMethodSaveCommandHandler extends CommandHandler<UserInformationUseMethodSaveCommand> {
	@Inject
	private UserInformationUseMethodRepository userInfoUseMethodRepository;

	@Override
	protected void handle(CommandHandlerContext<UserInformationUseMethodSaveCommand> context) {
		UserInformationUseMethodDto userInformationUseMethodDto = context.getCommand().getUserInformationUseMethodDto();
		String cId = userInformationUseMethodDto.getCompanyId();
		Optional<UserInformationUseMethod> userInformationUseMethod = userInfoUseMethodRepository.findByCId(cId);
		if (userInformationUseMethod.isPresent()) {
			// ユーザ情報の使用方法を変更する
			this.userInfoUseMethodRepository.update(UserInformationUseMethod.createFromMemento(userInformationUseMethodDto));
		} else {
			//	 ユーザ情報の使用方法を追加する
			this.userInfoUseMethodRepository.insert(UserInformationUseMethod.createFromMemento(userInformationUseMethodDto));
		}
	}
}
