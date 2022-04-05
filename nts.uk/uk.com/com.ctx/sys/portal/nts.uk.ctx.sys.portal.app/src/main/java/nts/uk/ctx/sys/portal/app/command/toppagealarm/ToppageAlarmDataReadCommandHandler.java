package nts.uk.ctx.sys.portal.app.command.toppagealarm;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmData;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmDataRepository;

/**
 * UKDesign.UniversalK.就業.KTG_ウィジェット.KTG031_トップページアラーム.トップページアラームver4.A:トップページアラーム.メニュー別OCD.アラームを既読にする
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class ToppageAlarmDataReadCommandHandler extends CommandHandler<ToppageAlarmDataReadCommand> {
	
	@Inject
	private ToppageAlarmDataRepository toppageAlarmDataRepo;
	
	@Override
	protected void handle(CommandHandlerContext<ToppageAlarmDataReadCommand> context) {
		ToppageAlarmDataReadCommand command = context.getCommand();
		
		//1:get(会社ID、アラーム分類、パターンコード、通知ID、表示社員ID、表示社員区分)
		Optional<ToppageAlarmData> exDomain = toppageAlarmDataRepo.get(
				command.getCompanyId(), 
				command.getSid(), 
				command.getDisplayAtr(),
				command.getAlarmClassification(), 
				Optional.ofNullable(command.getPatternCode()), 
				Optional.ofNullable(command.getNotificationId()));
		
		exDomain.ifPresent(domain -> {
			
			//2:set(システム日時)
			domain.updateReadDateTime(GeneralDateTime.now());
			
			//3:persist()
			toppageAlarmDataRepo.update(domain);
		});
	}
}
