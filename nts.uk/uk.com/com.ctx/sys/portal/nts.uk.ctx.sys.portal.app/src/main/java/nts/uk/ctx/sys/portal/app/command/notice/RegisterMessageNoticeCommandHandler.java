package nts.uk.ctx.sys.portal.app.command.notice;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.notice.MessageNotice;
import nts.uk.ctx.sys.portal.dom.notice.MessageNoticeRepository;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.お知らせ.App.お知らせを登録する
 * @author DungDV
 *
 */
@Stateless
@Transactional
public class RegisterMessageNoticeCommandHandler extends CommandHandler<RegisterMessageNoticeCommand>{

	@Inject
	private MessageNoticeRepository messageNoticeRepository;
	
	@Override
	protected void handle(CommandHandlerContext<RegisterMessageNoticeCommand> context) {
		try {
			RegisterMessageNoticeCommand command = context.getCommand();
			command.setCurrentDate();
			// 1. get(社員ID、システム日付)
			List<MessageNotice> listMsg = messageNoticeRepository.getByCreatorIdAndInputDate(command.getCreatorID(), command.getInputDate());
			
			// 2. [お知らせメッセージ　is　empty] create()
			if (listMsg.isEmpty()) {
				MessageNotice domain = new MessageNotice();
				domain.getMemento(command);
				messageNoticeRepository.insert(domain);
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	
	
}
