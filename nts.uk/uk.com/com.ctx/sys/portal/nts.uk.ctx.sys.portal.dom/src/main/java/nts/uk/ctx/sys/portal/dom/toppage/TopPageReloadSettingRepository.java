package nts.uk.ctx.sys.portal.dom.toppage;

import java.util.Optional;

/**
 * 
 * @author NWS-Hieutt
 *
 */
public interface TopPageReloadSettingRepository {
	
	/**
	 * 
	 * @param cId
	 * @return
	 */
	Optional<TopPageReloadSetting> getByCompanyId(String cId);
	
	/**
	 * 
	 * @param domain
	 */
	void insert(TopPageReloadSetting domain);
	
	/**
	 * 
	 * @param domain
	 */
	void update(TopPageReloadSetting domain);
}
