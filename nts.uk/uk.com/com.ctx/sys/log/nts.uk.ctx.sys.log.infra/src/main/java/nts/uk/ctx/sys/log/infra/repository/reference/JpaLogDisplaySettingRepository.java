package nts.uk.ctx.sys.log.infra.repository.reference;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.ejb.Stateless;
import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.log.dom.enums.SystemTypeEnum;
import nts.uk.ctx.sys.log.dom.reference.DataTypeEnum;
import nts.uk.ctx.sys.log.dom.reference.LogDisplaySetting;
import nts.uk.ctx.sys.log.dom.reference.LogDisplaySettingRepository;
import nts.uk.ctx.sys.log.dom.reference.LogSettingCode;
import nts.uk.ctx.sys.log.dom.reference.LogSettingName;
import nts.uk.ctx.sys.log.dom.reference.RecordTypeEnum;
import nts.uk.ctx.sys.log.infra.entity.reference.SrcmtDisplaySetting;
import nts.uk.ctx.sys.log.infra.entity.reference.SrcdtLogDisplaySettingPK;

/*
 * author: thuong.tv
 */

@Stateless
public class JpaLogDisplaySettingRepository extends JpaRepository implements LogDisplaySettingRepository {
	private static final String SELECT_ALL_QUERY_STRING = "SELECT s FROM SrcmtDisplaySetting s";
	private static final String SELECT_GET_CODE_NAME_QUERY_STRING = "SELECT s.srcdtLogDisplaySettingPK.logSetId,s.cid,s.code,s.name,s.dataType,s.recordType FROM SrcmtDisplaySetting s";
	private static final String SELECT_BY_KEY_STRING = SELECT_ALL_QUERY_STRING + " WHERE  s.cid =:cid AND  s.code =:code ";
	private static final String SELECT_BY_KEY_STRING_USE_FLG = SELECT_ALL_QUERY_STRING + " WHERE  s.cid =:cid AND  s.code =:code ";
	private static final String SELECT_BY_CID_STRING = SELECT_ALL_QUERY_STRING + " WHERE  s.cid =:cid ";
	private static final String SELECT_BY_RECORD_TYPE_STRING = SELECT_GET_CODE_NAME_QUERY_STRING + " WHERE  s.recordType =:recordType AND s.cid=:cid ";
	private static final String SELECT_BY_RECORD_TYPE_DATA_TYPE_STRING = SELECT_GET_CODE_NAME_QUERY_STRING + " WHERE  s.recordType =:recordType AND s.dataType =:targetDataType AND s.cid=:cid ";
	

	@Override
	public Optional<LogDisplaySetting> getLogDisplaySettingByCodeAndCid(String code, String cid) {
		return this.queryProxy().query(SELECT_BY_KEY_STRING, SrcmtDisplaySetting.class).setParameter("cid", cid)
				.setParameter("code", code).getSingle(c -> c.toDomain());
	}
	
	
	@Override
	public Optional<LogDisplaySetting> getLogDisplaySettingByCodeAndCidAndIsUseFlg(String code, String cid) {
		return this.queryProxy().query(SELECT_BY_KEY_STRING_USE_FLG, SrcmtDisplaySetting.class).setParameter("cid", cid)
				.setParameter("code", code).getSingle(c -> c.toDomain());
	}



	@Override
	public List<LogDisplaySetting> getAllLogDisplaySet(String cid) {
		return this.queryProxy().query(SELECT_BY_CID_STRING, SrcmtDisplaySetting.class)
				.setParameter("cid", cid)
				.getList(c -> c.toDomain()).stream()
				.sorted(new Comparator<LogDisplaySetting>() {
					@Override
					public int compare(LogDisplaySetting o1, LogDisplaySetting o2) {
						return Integer.valueOf(o1.getCode().v()) - Integer.valueOf(o2.getCode().v());
					}
				}).collect(Collectors.toList());
	}

	@Override
	public List<LogDisplaySetting> getLogDisplaySettingByRecordType(String logSetRecordType,String cid) {		
		List<Object> objects = this.queryProxy().query(SELECT_BY_RECORD_TYPE_STRING, Object.class)
				.setParameter("recordType", Integer.valueOf(logSetRecordType))
				.setParameter("cid", cid)
				.getQuery().getResultList();	
		return objects.stream().map(x -> {
			Object[] values = (Object[])x;
			return new LogDisplaySetting(String.valueOf(values[0]), String.valueOf(values[1]),
					 new LogSettingCode(String.valueOf(values[2])), new LogSettingName(String.valueOf(values[3]))
							 ,Objects.isNull(values[4])?null:DataTypeEnum.valueOf(Integer.valueOf(String.valueOf(values[4]) ))
							 ,RecordTypeEnum.valueOf(Integer.valueOf(String.valueOf(values[5])))
							 ,SystemTypeEnum.valueOf(Integer.valueOf(String.valueOf(values[6]))));			
		}).collect(Collectors.toList());
		
		
	}
	
	
	@Override
	public List<LogDisplaySetting> getLogDisplaySettingByRecordType(String logSetRecordType, String targetDataType,
			String cid) {
		List<Object> objects = this.queryProxy().query(SELECT_BY_RECORD_TYPE_DATA_TYPE_STRING, Object.class)
				.setParameter("recordType", Integer.valueOf(logSetRecordType))
				.setParameter("targetDataType",Integer.valueOf(targetDataType))
				.setParameter("cid", cid)
				.getQuery().getResultList();	
		return objects.stream().map(x -> {
			Object[] values = (Object[])x;
			return new LogDisplaySetting(String.valueOf(values[0]), String.valueOf(values[1]),
					 new LogSettingCode(String.valueOf(values[2])), new LogSettingName(String.valueOf(values[3]))
							 ,Objects.isNull(values[4])?null:DataTypeEnum.valueOf(Integer.valueOf(String.valueOf(values[4]) ))
							 ,RecordTypeEnum.valueOf(Integer.valueOf(String.valueOf(values[5])))
							 ,SystemTypeEnum.valueOf(Integer.valueOf(String.valueOf(values[6]))));			
		}).collect(Collectors.toList());
	}


	@Override
	public void add(LogDisplaySetting domain) {
		this.commandProxy().insert(SrcmtDisplaySetting.toEntity(domain));
		this.getEntityManager().flush();
	}
	
	@Override
	public void update(LogDisplaySetting domain) {
		 this.commandProxy().update(SrcmtDisplaySetting.toEntity(domain));
	}
	
	@Override
    public void remove(String logSetId){
		SrcdtLogDisplaySettingPK srcdtLogDisplaySettingPK = new SrcdtLogDisplaySettingPK(logSetId);
		this.commandProxy().remove(SrcmtDisplaySetting.class, srcdtLogDisplaySettingPK);
    }
}
