package nts.uk.ctx.sys.portal.dom.adapter.toppagesetting;

import java.util.Optional;

import nts.uk.ctx.sys.portal.dom.adapter.roleset.RoleSetDto;

/**
 * The Interface LoginRoleSetCodeAdapter.
 * Adapter ロールセットコードを取得するAdapter
 */
public interface LoginRoleSetCodeAdapter {

	/**
	 * Gets the login role set.
	 * ログイン者のロールセットを取得する
	 * @return the login role set
	 */
	public Optional<RoleSetDto> getLoginRoleSet();
}
