package nts.uk.ctx.sys.log.dom.reference;

import java.util.HashMap;
import java.util.List;

/**
 * 
 * @author thuongtv
 *
 */

public interface IPerInfoCtgOrderByComAdapter {
	
	/**
	 * Get order list category and item by list id
	 * @return Map<Integer,HashMap<String, Integer>>
	 */
    HashMap<Integer, HashMap<String, Integer>> getOrderList(List<String> categoryIds, List<String> itemDefinitionIds);
}
