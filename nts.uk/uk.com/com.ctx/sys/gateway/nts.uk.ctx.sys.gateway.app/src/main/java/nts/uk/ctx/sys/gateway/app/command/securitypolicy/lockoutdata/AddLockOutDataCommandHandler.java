package nts.uk.ctx.sys.gateway.app.command.securitypolicy.lockoutdata;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.gateway.dom.adapter.user.UserAdapter;
import nts.uk.ctx.sys.gateway.dom.adapter.user.UserImportNew;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockOutDataDto;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockOutDataRepository;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockType;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockoutData;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LoginMethod;
import nts.uk.shr.com.context.AppContexts;

/*
 * @author: Nguyen Van Hanh
 */
@Stateless
public class AddLockOutDataCommandHandler extends CommandHandler<AddLockOutDataCommand> {

	/** The user adapter repository. */
	@Inject
	UserAdapter userAdapter;

	/** The lock out data repository. */
	@Inject
	private LockOutDataRepository lockOutDataRepository;

	@Override
	protected void handle(CommandHandlerContext<AddLockOutDataCommand> context) {

		// UserId
		String userId = context.getCommand().getUserID();
		//contract code
		String contractCd = AppContexts.user().contractCode();

		Optional<UserImportNew> userOpt = userAdapter.findByUserId(userId);

		if (!userOpt.isPresent())
			return;

		// UserImportNew
		UserImportNew user = userOpt.get();
		
		// ãƒ‰ãƒ¡ã‚¤ãƒ³ãƒ¢ãƒ‡ãƒ«ã€Œãƒ­ãƒƒã‚¯ã‚¢ã‚¦ãƒˆãƒ‡ãƒ¼ã‚¿ã€�ã�®é‡�è¤‡ãƒ�ã‚§ãƒƒã‚¯ã‚’è¡Œã�†
		if (checkDuplicateLocking(user.getUserId(),contractCd)){
			throw new BusinessException("Msg_868");
		}else{
		// Add to domain model LockOutData
		LockOutDataDto dto = LockOutDataDto.builder()
				.userId(user.getUserId())
				.contractCode(user.getContractCode())
				.logoutDateTime(GeneralDateTime.now())
				.lockType(LockType.ENFORCEMENT_LOCK.value)
				.loginMethod(LoginMethod.NORMAL_LOGIN.value)
				.build();
		LockoutData lockOutData = new LockoutData(dto);
		this.lockOutDataRepository.add(lockOutData);
		}
	}
	
	/**
	 * Check if the key is registered
	 * @param userId
	 * @return boolean
	 */
	private boolean checkDuplicateLocking(String userId,String contractCd) {
		Optional<LockoutData> otp = lockOutDataRepository.find(userId);
		return otp.isPresent();
	}

}
