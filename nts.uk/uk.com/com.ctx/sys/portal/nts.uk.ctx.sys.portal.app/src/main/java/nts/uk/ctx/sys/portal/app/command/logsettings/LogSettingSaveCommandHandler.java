package nts.uk.ctx.sys.portal.app.command.logsettings;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.app.find.logsettings.LogSettingDto;
import nts.uk.ctx.sys.portal.dom.logsettings.LogSetting;
import nts.uk.ctx.sys.portal.dom.logsettings.LogSettingRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * アルゴリズム「ログ設定登録」を実行する
 * @author Tung
 *
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class LogSettingSaveCommandHandler extends CommandHandler<LogSettingSaveCommand> {

	@Inject
	private LogSettingRepository logSettingRepository;

	@Override
	protected void handle(CommandHandlerContext<LogSettingSaveCommand> context) {
		String cId = AppContexts.user().companyId();
		String contractCode = AppContexts.user().contractCode();
		
		List<LogSettingDto> listLogSettingDto = context.getCommand().getLogSettings();
		if (!listLogSettingDto.isEmpty()) {
			
			// Step ドメインモデル「ログ設定」を削除
			this.logSettingRepository.delete(cId, listLogSettingDto.get(0).getSystem());
			
			// Step ドメインモデル「ログ設定」に追加する
			this.addAll(cId, contractCode, listLogSettingDto);
		}
	}
	
	private void addAll(String cId, String contractCode, List<LogSettingDto> listLogSettingDto) {
		this.logSettingRepository.addAll(contractCode, listLogSettingDto.stream()
				.map(dto -> {
					dto.setCompanyId(cId);
					return LogSetting.createFromMemento(dto);
				})
				.collect(Collectors.toList()));
	}

}
