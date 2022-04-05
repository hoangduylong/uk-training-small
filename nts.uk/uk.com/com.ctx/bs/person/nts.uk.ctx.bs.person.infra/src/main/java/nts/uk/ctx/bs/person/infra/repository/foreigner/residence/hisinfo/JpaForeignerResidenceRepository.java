/**
 * 
 */
package nts.uk.ctx.bs.person.infra.repository.foreigner.residence.hisinfo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.time.GeneralDateTime;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo.ForeignerResidenceHistoryInforItem;
import nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo.ForeignerResidenceRepository;
import nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo.PerUnqualifiedActivity;
import nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo.ReportWorkOutside;
import nts.uk.ctx.bs.person.infra.entity.foreigner.residence.hisinfo.PpetdForeignerResidenceHisInfoItem;

@Stateless
public class JpaForeignerResidenceRepository extends JpaRepository implements ForeignerResidenceRepository {

	@Override
	public List<ForeignerResidenceHistoryInforItem> getListForeignerResidenceHistoryInforItem(List<String> listpId,
			GeneralDateTime baseDate) {

		if (listpId.isEmpty() || baseDate == null) {
			return new ArrayList<ForeignerResidenceHistoryInforItem>();
		}
		
		String SELECT_BY_LISTPID_AND_BASEDATE = "SELECT a FROM PpetdForeignerResidenceHisInfoItem a "
				+ "inner join PpetdForeignerResidenceHisInfo b on a.key.hisId = b.key.hisId "
				+ "WHERE b.pId IN :listpId and b.startDate <= :baseDate "
				+ "and ((b.endDate is NULL) or (b.endDate >= :baseDate))";
		
		List<PpetdForeignerResidenceHisInfoItem> listEntity = new ArrayList<>();
		CollectionUtil.split(listpId, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			listEntity.addAll(this.getEntityManager().createQuery(SELECT_BY_LISTPID_AND_BASEDATE,PpetdForeignerResidenceHisInfoItem.class)
					.setParameter("baseDate", baseDate)				 
					.setParameter("listpId", subList).getResultList());
		});
		
		if (listEntity.isEmpty()) {
			return new ArrayList<ForeignerResidenceHistoryInforItem>();
		}
		
		List<ForeignerResidenceHistoryInforItem> result = listEntity.stream().map(e -> toDomain(e)).collect(Collectors.toList());
		
		return result;
	}

	@Override
	public Optional<ForeignerResidenceHistoryInforItem> getForeignerResidenceHistoryInforItem(String pId,
			GeneralDateTime baseDate) {
		
		return null;
	}

	@Override
	public List<ForeignerResidenceHistoryInforItem> getListForeignerResidenceHistoryInforItem(List<String> listSID) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<ForeignerResidenceHistoryInforItem> getListForeignerResidenceHistoryInforItem(String sid) {
		// TODO Auto-generated method stub
		return null;
	}

	private ForeignerResidenceHistoryInforItem toDomain(PpetdForeignerResidenceHisInfoItem entity) {
		return new ForeignerResidenceHistoryInforItem(entity.pid, entity.issueDate, entity.key.hisId,
				entity.statusOfResidenceID.longValue(), entity.statusOfResidenceCode, entity.statusOfResidenceName,
				entity.periodOfStayID == null ? null : entity.periodOfStayID.intValue(), entity.periodOfStayCode, entity.periodOfStayName,
				entity.numberResidencePermit,
				EnumAdaptor.valueOf(entity.perUnqualifiedActivity == null ? 0 : entity.perUnqualifiedActivity , PerUnqualifiedActivity.class),
				EnumAdaptor.valueOf(entity.reportWorkOutside == null ? 0 : entity.reportWorkOutside , ReportWorkOutside.class), 
				entity.nationalityID == null ?  null : entity.nationalityID.intValue(),
				entity.nationalityCode, entity.nationalityName);
	}

}
