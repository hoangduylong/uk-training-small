package nts.uk.ctx.sys.portal.app.command.smartphonetoppageset;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.app.find.smartphonetoppage.SPTopPageDetailDto;
import nts.uk.ctx.sys.portal.dom.smartphonetoppageset.NotificationDetailSet;
import nts.uk.ctx.sys.portal.dom.smartphonetoppageset.NotificationDisplayItem;
import nts.uk.ctx.sys.portal.dom.smartphonetoppageset.SPTopPageSetRepository;
import nts.uk.ctx.sys.portal.dom.smartphonetoppageset.TimeStatusDetailsSet;
import nts.uk.ctx.sys.portal.dom.smartphonetoppageset.TimeStatusDisplayItem;
import nts.uk.shr.com.context.AppContexts;

/**
 * 登録処理
 * 
 * @author sonnh1
 *
 */
@Stateless
public class UpdateSPTopPageDetailCommandHandler extends CommandHandler<UpdateSPTopPageDetailCommand> {

	@Inject
	private SPTopPageSetRepository repo;

	@Override
	protected void handle(CommandHandlerContext<UpdateSPTopPageDetailCommand> context) {
		String companyId = AppContexts.user().companyId();
		UpdateSPTopPageDetailCommand command = context.getCommand();
		List<SPTopPageDetailDto> listSPTopPageDetailDto = command.getListSPTopPageDetailDto();
		int type = command.getListSPTopPageDetailDto().get(0).getType();
		// 起動時のパラメータ．起動モードをチェックする
		if (type == 0) {
			// アルゴリズム「通知詳細設定を登録する」を実行する
			Optional<NotificationDetailSet> optNoti = this.repo.getNotificationDetailSet(companyId, type);
			if (!optNoti.isPresent()) {
				return;
			}
			Map<Integer, Integer> mapNotiItemDB = optNoti.get().getDetailedItem().stream()
					.collect(Collectors.toMap(x -> x.getDetailType().value, x -> x.getDisplayAtr().value));
			List<SPTopPageDetailDto> lstNotiItemResult = new ArrayList<>();
			listSPTopPageDetailDto.forEach(x -> {
				if (mapNotiItemDB.containsKey(x.getDetailType())
						&& mapNotiItemDB.get(x.getDetailType()) != x.getDisplayAtr()) {
					lstNotiItemResult.add(x);
				}
			});

			List<NotificationDisplayItem> listDetailedItem = lstNotiItemResult.stream()
					.map(x -> NotificationDisplayItem.createFromJavaType(x.getDetailType(), x.getDisplayAtr()))
					.collect(Collectors.toList());
			NotificationDetailSet domain = NotificationDetailSet.createFromJavaType(companyId, listDetailedItem);

			this.repo.updateNoti(domain);
		} else {
			// アルゴリズム「勤怠状況詳細設定を登録する」を実行する
			Optional<TimeStatusDetailsSet> optTimeStatus = this.repo.getTimeStatusDetailsSet(companyId, type);
			if (!optTimeStatus.isPresent()) {
				return;
			}
			Map<Integer, Integer> mapTimeStatusDB = optTimeStatus.get().getDetailedItem().stream()
					.collect(Collectors.toMap(x -> x.getDetailType().value, x -> x.getDisplayAtr().value));
			List<SPTopPageDetailDto> lstTimeStatusResult = new ArrayList<>();
			listSPTopPageDetailDto.forEach(x -> {
				if (mapTimeStatusDB.containsKey(x.getDetailType())
						&& mapTimeStatusDB.get(x.getDetailType()) != x.getDisplayAtr()) {
					lstTimeStatusResult.add(x);
				}
			});

			List<TimeStatusDisplayItem> listDetailedItem = lstTimeStatusResult.stream()
					.map(x -> TimeStatusDisplayItem.createFromJavaType(x.getDetailType(), x.getDisplayAtr()))
					.collect(Collectors.toList());
			TimeStatusDetailsSet domain = TimeStatusDetailsSet.createFromJavaType(companyId, listDetailedItem);

			this.repo.updateStatus(domain);
		}
	}
}
