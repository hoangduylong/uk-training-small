package nts.uk.ctx.sys.portal.ws.toppagesetting;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.uk.ctx.sys.portal.app.command.toppagesetting.AddTopPageRoleSettingCommandHandler;
import nts.uk.ctx.sys.portal.app.command.toppagesetting.TopPageRoleSettingCommandBase;
import nts.uk.ctx.sys.portal.app.command.toppagesetting.UpdateTopPageRoleSettingCommandHandler;
import nts.uk.ctx.sys.portal.app.find.toppagesetting.TopPageRoleSettingDto;
import nts.uk.ctx.sys.portal.app.find.toppagesetting.TopPageRoleSettingFinder;

@Path("sys/portal/toppagesetting/roleset")
@Produces("application/json")
public class TopPageRoleSettingWebService {
	
	@Inject
	TopPageRoleSettingFinder topPageRoleSettingFinder;

	@Inject
	UpdateTopPageRoleSettingCommandHandler updateTopPageRoleSettingCommandHandler;
	
	@Inject
	AddTopPageRoleSettingCommandHandler addTopPageRoleSettingCommandHandler;
	
	/**
	 * Find all.
	 * 	ドメインモデル「権限別トップページ設定」を取得
	 * @return the list
	 */
	@POST
	@Path("findAll")
	public List<TopPageRoleSettingDto> findAll() {
		/*
		 * 【条件】
		 * 会社ID＝ログイン会社ID 
		 * 【並び順】
		 * ロールセットコード
		 */
		return this.topPageRoleSettingFinder.getAllByCompanyId();
	}
	
	/**
	 * Update.
	 * アルゴリズム「権限別登録」を実行する
	 * @param command the command
	 */
	@POST
	@Path("save")
	public void update(List<TopPageRoleSettingCommandBase> command) {
		Optional<TopPageRoleSettingDto> dto;
		for (TopPageRoleSettingCommandBase item : command) {
			dto = this.topPageRoleSettingFinder.getByCompanyIdAndRoleSetCode(item.getRoleSetCode());
			if (dto.isPresent()) {
				this.updateTopPageRoleSettingCommandHandler.handle(item);
			} else {
				this.addTopPageRoleSettingCommandHandler.handle(item);
			}
		}
	}
}
