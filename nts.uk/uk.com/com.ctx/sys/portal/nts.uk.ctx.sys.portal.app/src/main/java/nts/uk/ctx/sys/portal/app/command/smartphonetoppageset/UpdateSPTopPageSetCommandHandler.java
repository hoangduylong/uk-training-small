package nts.uk.ctx.sys.portal.app.command.smartphonetoppageset;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.app.find.smartphonetoppage.SPTopPageSetDto;
import nts.uk.ctx.sys.portal.dom.smartphonetoppageset.SPTopPageSet;
import nts.uk.ctx.sys.portal.dom.smartphonetoppageset.SPTopPageSetRepository;
import nts.uk.ctx.sys.portal.dom.smartphonetoppageset.SPTopPageType;
import nts.uk.shr.com.context.AppContexts;

/**
 * 登録処理
 * 
 * @author sonnh1
 *
 */
@Stateless
public class UpdateSPTopPageSetCommandHandler extends CommandHandler<UpdateSPTopPageSetCommand> {

	@Inject
	private SPTopPageSetRepository repo;

	@Override
	protected void handle(CommandHandlerContext<UpdateSPTopPageSetCommand> context) {
		String companyId = AppContexts.user().companyId();
		List<SPTopPageSetDto> lstSPTopPageSetDto = context.getCommand().getListSPTopPageSetDto();
		int systemAtr = lstSPTopPageSetDto.get(0).getSystemAtr();
		// find list menu exist in DB
		List<SPTopPageSet> lstSPTopPageSetDB = this.repo.getTopPageSet(companyId, systemAtr);
		// Map<type, displayAtr>
		Map<Integer, Integer> map = lstSPTopPageSetDB.stream().collect(
				Collectors.toMap(x -> x.getSmartPhoneTopPageType().getType().value, x -> x.getDisplayAtr().value));
		List<SPTopPageSetDto> results = new ArrayList<>();
		lstSPTopPageSetDto.forEach(x -> {
			if (map.containsKey(x.getType()) && map.get(x.getType()) != x.getDisplayAtr()) {
				results.add(x);
			}
		});
		// convert to domain
		List<SPTopPageSet> lstSPTopPageSet = results.stream()
				.map(x -> SPTopPageSet.createFromJavaType(companyId,
						SPTopPageType.createFromJavaType(x.getSystemAtr(), x.getType()), x.getDisplayAtr()))
				.collect(Collectors.toList());

		// アルゴリズム「スマホのトップページ設定を登録する」を実行する
		this.repo.update(lstSPTopPageSet);
	}

}
