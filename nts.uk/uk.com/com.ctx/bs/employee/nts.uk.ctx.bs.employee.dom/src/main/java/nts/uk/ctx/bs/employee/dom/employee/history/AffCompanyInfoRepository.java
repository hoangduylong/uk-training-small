package nts.uk.ctx.bs.employee.dom.employee.history;

import java.util.List;

public interface AffCompanyInfoRepository {

	public void add(AffCompanyInfo domain);
	public void update(AffCompanyInfo domain);
	
	public void remove(AffCompanyInfo domain);
	public void remove(String histId);
	
	public AffCompanyInfo getAffCompanyInfoByHistId(String histId);
	/**
	 * lấy tất cả thông tin comInfo theo list histIds
	 * @author lanlt
	 * @param histIds
	 * @return
	 */
	public List<AffCompanyInfo> getAffCompanyInfoByHistId(List<String> histIds);
	
	/**
	 * @author lanlt
	 * add all AffCompanyInfo
	 * @param domains
	 */
	public void addAll(List<AffCompanyInfo> domains);
	
	/**
	 * @author lanlt
	 * update all AffCompanyInfo
	 * @param domain
	 */
	public void updateAll(List<AffCompanyInfo> domains);

}
