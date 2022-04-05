package nts.uk.ctx.sys.portal.dom.toppage;

import java.util.List;
import java.util.Optional;

/**
 * 
 * @author NWS-Hieutt
 *
 */
public interface ToppageRepository {
	
	/**
	 * 
	 * @param domain
	 */
	void insert(Toppage domain);
	
	/**
	 * 
	 * @param domain
	 */
	void update(Toppage domain);
	
	/**
	 * 
	 * @param CompanyId
	 * @param topPageCode
	 */
	void delete(String companyId, String topPageCode);
	
	/**
	 * 
	 * @param companyId
	 * @return
	 */
	List<Toppage> getByCid(String companyId);
	
	/**
	 * ドメインモデル「トップページ」を取得する
	 * 
	 * @param companyId 
	 * @param topPageCode トップページコード
	 * @return
	 */
	Optional<Toppage> getByCidAndCode(String companyId, String topPageCode);
}
