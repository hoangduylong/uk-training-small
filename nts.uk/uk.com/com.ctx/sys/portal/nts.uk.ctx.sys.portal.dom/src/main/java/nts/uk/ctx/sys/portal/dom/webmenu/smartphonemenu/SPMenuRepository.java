package nts.uk.ctx.sys.portal.dom.webmenu.smartphonemenu;

import java.util.List;
import nts.uk.ctx.sys.portal.dom.standardmenu.MenuCode;
/**
 * 
 * @author sonnh1
 *
 */
public interface SPMenuRepository {

	/**
	 * SmartPhone Menu Employment Repository
	 */

	public List<SPMenuEmployment> getDataEmp(String companyId);

	public List<SPMenuEmployment> getDataEmp(String companyId, String empRoleId, List<String> lstMenuCd);
	
	public void add(List<SPMenuEmployment> lstSPMenuEmployment);
	
	public void update(List<SPMenuEmployment> lstSPMenuEmployment);

	/**
	 * SmartPhone Menu Group Repository
	 */

	public List<SPMenuGroup> getDataGroup(String companyId, List<String> lstCode);

	/**
	 * SmartPhone Menu Order Repository
	 */

	public List<SPMenuOrder> getDataOrder(String companyId, List<String> lstCode);
	
	public List<SPMenuEmployment> findSPMenuEmploymentUse(String companyID, String roleID);
	
	public List<SPMenuOrder> findSPMenuOrderASC(String companyID);
	
	public List<SPMenuGroup> findSPMenuGroupSubList(String companyID, List<MenuCode> subLst);
	
}
