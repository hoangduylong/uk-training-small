package command.person.personal;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryNotice;
import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryRepository;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.個人.個人のインフォメーション.App.個人の記念日を閲覧する
 * @author DungDV
 *
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class BrowsePersonalAnniversarieCommandHandler extends CommandHandler<BrowsePersonalAnniversarieCommand> {
	
	@Inject
	private AnniversaryRepository anniversaryRepository;
	
	protected void handle(CommandHandlerContext<BrowsePersonalAnniversarieCommand> context) {
		try {
			BrowsePersonalAnniversarieCommand command = context.getCommand();
			// 1. get (個人ID、記念日)
			Optional<AnniversaryNotice> anniversary = anniversaryRepository
					.getByPersonalIdAndAnniversary(command.getPersonalId(), command.getAnniversary());
			
			// 2. [not　個人の記念日情報　is　empty] 最後見た記念日をUpdateする(年月日)
			if (!anniversary.isPresent()) {
				return;
			}
			AnniversaryNotice anniversaryNotice = anniversary.get();
			anniversaryNotice.updateSeenDate(command.getReferDate());
			// 3. persist
			anniversaryRepository.update(anniversaryNotice);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
