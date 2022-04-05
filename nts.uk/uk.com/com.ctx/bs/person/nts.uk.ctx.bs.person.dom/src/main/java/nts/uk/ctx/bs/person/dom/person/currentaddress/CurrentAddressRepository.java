/**
 * 
 */
package nts.uk.ctx.bs.person.dom.person.currentaddress;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;

/**
 * @author danpv
 *
 */
public interface CurrentAddressRepository {

	Optional<CurrentAddress> getByPerIdAndStd(String personId, GeneralDate standandDate);

	List<CurrentAddress> getListByPid(String pid);

	CurrentAddress getCurAddById(String curAddId);

	/**
	 * add current address ドメインモデル「現住所」を新規登録する
	 * 
	 * @param currentAddress
	 */
	void addCurrentAddress(CurrentAddress currentAddress);

	/**
	 * update current address 取得した「現住所」を更新する
	 * 
	 * @param currentAddress
	 */
	void updateCurrentAddress(CurrentAddress currentAddress);

}
