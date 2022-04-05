package nts.uk.ctx.sys.portal.app.command.notice;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.notice.MessageNotice;
import nts.uk.ctx.sys.portal.dom.notice.MessageNoticeRepository;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.お知らせ.App.お知らせを閲覧する
 * @author DungDV
 *
 */
@Stateless
@Transactional
public class ViewMessageNoticeCommandHandler extends CommandHandler<ViewMessageNoticeCommand> {

	@Inject
	private MessageNoticeRepository messageNoticeRepository;
	
	@Override
	protected void handle(CommandHandlerContext<ViewMessageNoticeCommand> context) {
		try {
			ViewMessageNoticeCommand command = context.getCommand();
			List<MessageNotice> listMessage = new ArrayList<MessageNotice>();
			// 1. get*(Map.作成者ID、Map.入力日)
			command.getMsgInfors().stream().forEach(msg -> {
				List<MessageNotice> listMsg = messageNoticeRepository.getByCreatorIdAndInputDate(msg.getCreatorId(), msg.getInputDate());
				listMessage.addAll(listMsg);
			});
			
			// 2. [not　お知らせメッセージ　is　empty]: メッセージを見た情報をUpdateする(お知らせメッセージ、社員ID)
			if (!listMessage.isEmpty()) {
				listMessage.forEach(msg -> {
					messageNoticeRepository.updateInforSawMessage(msg, command.getSid());
				});
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
