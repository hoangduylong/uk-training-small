package nts.uk.shr.infra.logcollector.infra;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.collection.CollectionUtil;
import nts.uk.shr.infra.logcollector.dom.LogAccessInfo;
import nts.uk.shr.infra.logcollector.dom.LogAccessInfoRepository;

@Stateless
public class LogAccessInfoRepositoryImpl extends JpaRepository implements LogAccessInfoRepository {

	private static final String GET_All_ACCESS_INFOS;
	private static final String GET_ACCESS_INFOS_BY_HOST;
	private static final String GET_ACCESS_INFOS_BY_DOMAIN;
	private static final String GET_ACCESS_INFOS_BY_HOST_AND_DOMAIN;
	
	static {
		GET_All_ACCESS_INFOS = "SELECT a FROM LogAccessInfoEntity a";
		GET_ACCESS_INFOS_BY_HOST = GET_All_ACCESS_INFOS + " WHERE a.id.host IN :host";
		GET_ACCESS_INFOS_BY_DOMAIN = GET_All_ACCESS_INFOS + " WHERE a.id.domain IN :domain";
		GET_ACCESS_INFOS_BY_HOST_AND_DOMAIN = GET_ACCESS_INFOS_BY_HOST + " AND a.id.domain IN :domain";
	}
	
	/* (non-Javadoc)
	 * @see nts.uk.com.log.infra.repo.LogAccessInfoRepository#getAll()
	 */
	@Override
	public List<LogAccessInfo> getAll() {
		return this.queryProxy().query(GET_All_ACCESS_INFOS, LogAccessInfoEntity.class).getList(e -> toDto(e));
	}
	
	/**
	 * To Dto.
	 * @param entity
	 * @return dto
	 */
	private LogAccessInfo toDto(LogAccessInfoEntity entity) {
		return new LogAccessInfo(entity.id.domain, entity.id.host, 
									Optional.ofNullable(entity.id.userName), 
									Optional.ofNullable(entity.password), 
									Optional.ofNullable(entity.location));
	}

	@Override
	public List<LogAccessInfo> getByHost(List<String> hosts) {
		List<LogAccessInfo> result = new ArrayList<>();
		
		CollectionUtil.split(hosts, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, h -> {
			result.addAll(this.queryProxy().query(GET_ACCESS_INFOS_BY_HOST, LogAccessInfoEntity.class)
											.setParameter("host", h).getList(e -> toDto(e)));
		});
		
		return result;
	}

	@Override
	public List<LogAccessInfo> getByDomains(List<String> domains) {
		List<LogAccessInfo> result = new ArrayList<>();
		
		CollectionUtil.split(domains, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, d -> {
			result.addAll(this.queryProxy().query(GET_ACCESS_INFOS_BY_DOMAIN, LogAccessInfoEntity.class)
											.setParameter("domain", d).getList(e -> toDto(e)));
		});
		
		return result;
	}

	@Override
	public List<LogAccessInfo> getBy(List<String> domains, List<String> hosts) {
		if(CollectionUtil.isEmpty(domains) && CollectionUtil.isEmpty(hosts)){
			return getAll();
		}
		
		if(CollectionUtil.isEmpty(domains) && !CollectionUtil.isEmpty(hosts)){
			return getByHost(hosts);
		}
		
		if(!CollectionUtil.isEmpty(domains) && CollectionUtil.isEmpty(hosts)){
			return getByDomains(domains);
		}
		
		List<LogAccessInfo> result = new ArrayList<>();
		
		CollectionUtil.split(hosts, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, h -> {
			CollectionUtil.split(domains, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, d -> {
				result.addAll(this.queryProxy().query(GET_ACCESS_INFOS_BY_HOST_AND_DOMAIN, LogAccessInfoEntity.class)
												.setParameter("host", h)
												.setParameter("domain", d)
												.getList(e -> toDto(e)));
			});
		});
		
		return result;
	}
}
