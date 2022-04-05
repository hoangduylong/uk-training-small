/**
 * 
 */
package nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDateTime;

/**
 * @author laitv
 */

@Stateless
public class ForeignerResidenceServices {

	@Inject
	private ForeignerResidenceRepository repo;

	// 外国人在留履歴情報をロードする
	public ForeignerResidenceManagement loadForeignerResidence(List<String> listPID, GeneralDateTime baseDate,
			ForeignerResidenceManagement result) {

		List<ForeignerResidenceHistoryInforItem> listDomain = repo.getListForeignerResidenceHistoryInforItem(listPID,
				baseDate);
		result.fillData(listDomain, listPID);
		return result;
	}

	// 外国人在留履歴情報の取得
	public ForeignerResidenceHistoryInforItem getForeignerResidence(String pid, GeneralDateTime baseDate,
			ForeignerResidenceManagement foreignerResidenceManagement) {
		Optional<ForeignerResidenceHistoryInforItem> domainOpt = foreignerResidenceManagement.getForeignerResidenceHisInfoItems()
				.stream().filter(e -> e.pid.equals(pid)).findFirst();
		if (domainOpt.isPresent()) {
			return domainOpt.get();
		} else {
			
			Optional<String> pidOpt = foreignerResidenceManagement.getSearchedPIDs()
					.stream().filter(e -> e.equals(pid)).findFirst();
			
			if (pidOpt.isPresent()) {
				return null;
			}

			List<ForeignerResidenceHistoryInforItem> domain = repo
					.getListForeignerResidenceHistoryInforItem(Arrays.asList(pid), baseDate);
			if (domain.isEmpty()) {
				return null;
			}
			return domain.get(0);
		}
	}
}
