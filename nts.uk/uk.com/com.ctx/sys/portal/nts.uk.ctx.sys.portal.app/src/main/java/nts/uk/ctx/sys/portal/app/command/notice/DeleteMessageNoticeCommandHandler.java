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
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.お知らせ.App.お知らせを削除する
 * @author DungDV
 *
 */
@Stateless
@Transactional
public class DeleteMessageNoticeCommandHandler extends CommandHandler<DeleteMessageNoticeCommand> {
	
	@Inject
	private MessageNoticeRepository messageNoticeRepository;
	
	@Override
	protected void handle(CommandHandlerContext<DeleteMessageNoticeCommand> context) {
		try {
			DeleteMessageNoticeCommand command = context.getCommand();
			// 1. get(社員ID、システム日付)
			List<MessageNotice> listMsg = messageNoticeRepository.getByCreatorIdAndInputDate(command.getCreatorID(), command.getInputDate());
			// 2. お知らせメッセージ　is　empty
			if (listMsg.isEmpty()) {
				throw new BusinessException("Msg_1807");
			}
			// 3. [not　お知らせメッセージ　is　empty]: delete(作成者ID、入力日)
			messageNoticeRepository.delete(listMsg.get(0));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
}
