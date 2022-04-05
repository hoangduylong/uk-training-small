package nts.uk.ctx.sys.portal.app.command.notice;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.notice.MessageNotice;
import nts.uk.ctx.sys.portal.dom.notice.MessageNoticeRepository;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.お知らせ.App.お知らせを更新する
 * 
 * @author DungDV
 *
 */
@Stateless
@Transactional
public class UpdateMessageNoticeCommandHandler extends CommandHandler<UpdateMessageNoticeCommand> {

	@Inject
	private MessageNoticeRepository messageNoticeRepository;

	@Override
	protected void handle(CommandHandlerContext<UpdateMessageNoticeCommand> context) {
		try {
			UpdateMessageNoticeCommand command = context.getCommand();
			// 1. get(社員ID、システム日付)
			List<MessageNotice> listMsg = messageNoticeRepository.getByCreatorIdAndInputDate(command.getSid(),
					command.getInputDate());

			// 3. [お知らせメッセージ is empty]
			if (listMsg.isEmpty()) {
				throw new BusinessException("Msg_1806");
			}

			// 2. [not お知らせメッセージ is empty]: set(お知らせメッセージ)
			MessageNotice domain = listMsg.get(0);
			command.setEmployeeIdSeen(domain.getEmployeeIdSeen());
			domain.getMemento(command);
			messageNoticeRepository.update(domain);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
