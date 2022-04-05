package nts.uk.ctx.sys.portal.dom.adapter.generalsearch;

import lombok.Builder;
import lombok.Data;

/**
 * The Class LoginRulerImport.
 * ログイン者のルール担当 Import
 */
@Builder
@Data
public class LoginRulerImport {
	
	/**   
	 * isPayRoll 
	 * 給与担当者か. 
	 **/
	private boolean isPayRoll;
	
	/** 
	 * The human resource. 
	 * 人事担当者か
	 **/
	private boolean isHumanResource;
	
	/**   
	 * 就業担当者か. 
	 **/
	private boolean isEmployee;
	
	/**
	 * Checks if is person incharge.
	 * 担当者か
	 * ログイン者が担当者か判断するため
	 * @return true, if is person incharge
	 */
	public boolean isPersonIncharge() {
		return isEmployee || isPayRoll || isHumanResource;
	}
}
