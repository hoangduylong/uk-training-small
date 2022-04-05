package nts.uk.ctx.sys.portal.infra.repository.logsettings;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.portal.dom.logsettings.LogSetting;
import nts.uk.ctx.sys.portal.dom.logsettings.LogSettingRepository;
import nts.uk.ctx.sys.portal.infra.entity.logsettings.SrcdtLogSetting;

@Stateless
public class JpaLogSettingRepository extends JpaRepository implements LogSettingRepository {

	private static final String SELECT_ALL_QUERY_STRING = "SELECT s FROM SrcdtLogSetting s ";
	private static final String SELECT_BY_SYSTEM_TYPE = SELECT_ALL_QUERY_STRING
			+ "WHERE s.srcdtLogSettingPK.system = :systemType " + "AND s.srcdtLogSettingPK.cid = :cid";
	private static final String DELETE_BY_SYSTEM_TYPE = "DELETE FROM SrcdtLogSetting s "
			+ "WHERE s.srcdtLogSettingPK.system = :systemType " + "AND s.srcdtLogSettingPK.cid = :cid";

	@Override
	public List<LogSetting> findBySystem(String companyId, int systemType) {
		return this.queryProxy().query(SELECT_BY_SYSTEM_TYPE, SrcdtLogSetting.class)
				.setParameter("systemType", systemType)
				.setParameter("cid", companyId)
				.getList(LogSetting::createFromMemento);
	}

	@Override
	public void addAll(String contractCode, List<LogSetting> listDomain) {
		// Convert data to entity
		List<SrcdtLogSetting> listEntity = listDomain.stream()
				.map(domain -> JpaLogSettingRepository.toEntity(contractCode, domain))
				.collect(Collectors.toList());
		// Insert entity
		this.commandProxy().insertAll(listEntity);
	}

	@Override
	public void delete(String companyId, Integer systemType) {
		this.getEntityManager().createQuery(DELETE_BY_SYSTEM_TYPE, SrcdtLogSetting.class)
			.setParameter("systemType", systemType)
			.setParameter("cid", companyId)
			.executeUpdate();
	}

	public static SrcdtLogSetting toEntity(String contractCode, LogSetting domain) {
		SrcdtLogSetting entity = new SrcdtLogSetting();
		domain.setMemento(entity);
		entity.setContractCd(contractCode);
		return entity;
	}

}
