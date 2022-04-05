package nts.uk.ctx.sys.portal.dom.layout;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface LayoutRepository {

	/**
	 * 
	 * @param domain
	 */
	void insert(Layout domain);
	
	/**
	 * 
	 * @param domain
	 */
	void update(Layout domain);
	
	/**
	 * 
	 * @param CompanyId
	 * @param topPageCode
	 */
	void delete(String companyId, String topPageCd, BigDecimal layoutNo);
	
	/**
	 * 
	 * @param companyId
	 * @param topPageCode
	 */
	void delete(String companyId, String topPageCode, List<BigDecimal> lstLayoutNo);
	
	/**
	 * 
	 * @param companyId
	 * @return
	 */
	List<Layout> getByCid(String companyId);
	
	/**
	 * 
	 * @param companyId
	 * @param topPageCode
	 * @return
	 */
	Optional<Layout> getByCidAndCode(String companyId, String topPageCd, BigDecimal layoutNo);
	
	Optional<WidgetSetting> getByCidAndCodeAndWidgetType(String companyId, String topPageCd, BigDecimal layoutNo, Integer widgetType);
	
	List<Layout> getByCidAndCode(String companyId, String topPageCd);
	
	List<BigDecimal> getLstLayoutNo(String topPageCd);
	
	void insertListWidget(Layout layout, List<WidgetSetting> listWidget);
	
	void updateListWidget(Layout layout, List<WidgetSetting> listWidget);
	
	void deleteListWidget(Layout layout, List<WidgetSetting> listWidget);
	
	void insertAndFlush(Layout domain);
}
