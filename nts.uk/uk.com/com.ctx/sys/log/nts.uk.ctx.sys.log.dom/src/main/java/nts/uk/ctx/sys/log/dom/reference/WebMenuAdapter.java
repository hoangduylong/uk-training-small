package nts.uk.ctx.sys.log.dom.reference;

import java.util.Map;

/**
 * 
 * @author thuongtv
 *
 */

public interface WebMenuAdapter {
	/**
	 * Get list Program name by company ID
	 * @return PersonEmpBasicInfoImport
	 */
	Map<String,String> getWebMenuByCId(String cId);
}
