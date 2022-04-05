package repository.workplacegroup;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import entity.workplacegroup.BsymtAffWorkPlaceGroup;
import entity.workplacegroup.BsymtWorkplaceGroup;
import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroupRespository;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;
/**
 * 
 * 職場グループ所属情報Repository
 * @author phongtq
 *
 */
@Stateless
public class JpaAffWorkplaceGroupRespository extends JpaRepository implements AffWorkplaceGroupRespository {

	private static final String SELECT = "SELECT c FROM BsymtAffWorkPlaceGroup c ";

	private static final String SELECT_BY_CID = SELECT + " WHERE c.pk.CID = :CID";

	private static final String SELECT_BY_CID_CODE_WID = SELECT_BY_CID + " AND c.pk.WKPGRPID = :WKPGRPID";

	private static final String SELECT_BY_CID_CODE_WPID = SELECT_BY_CID_CODE_WID + " AND c.pk.WKPID = :WKPID";

	private static final String SELECT_BY_CID_WPID = SELECT_BY_CID + " AND c.pk.WKPID = :WKPID";

	private static final String SELECT_BY_CID_LIST_WPID = SELECT_BY_CID + " AND c.pk.WKPID IN :lstWPID";

	private static final String SELECT_BY_LIST_ID = SELECT_BY_CID_CODE_WID + " AND c.pk.WKPID IN :lstWPID";

	private static final String SELECT_BY_DATE_COMPANY = "SELECT c.pk.WKPID FROM BsymtAffWorkPlaceGroup c "
			+ " LEFT JOIN BsymtWorkplaceGroup wpg ON c.pk.WKPGRPID = wpg.pk.WKPGRPID" + " WHERE wpg.pk.CID = :CID"
			+ " AND wpg.pk.WKPGRPID = :WKPGRPID" + " ORDER BY wpg.WKPGRPCode ASC, c.pk.WKPID ASC";

	private static final String SELECT_WPID_BY_CODE = "SELECT c.pk.WKPID FROM BsymtAffWorkPlaceGroup c "
			+ " LEFT JOIN BsymtWorkplaceGroup wpg ON c.pk.WKPGRPID = wpg.pk.WKPGRPID" + " WHERE wpg.pk.CID = :CID"
			+ " AND wpg.WKPGRPCode = :WKPGRPCode" + " ORDER BY wpg.WKPGRPCode ASC, c.pk.WKPID ASC";

	private static final String SELECT_WORKPLACE_GROUP = "SELECT wpg FROM BsymtWorkplaceGroup wpg "
			+ " LEFT JOIN BsymtAffWorkPlaceGroup atc ON wpg.pk.WKPGRPID = atc.pk.WKPGRPID" + " WHERE wpg.pk.CID = :CID"
			+ " AND atc.pk.WKPID = :WKPID";

	
	private static final String CHECK_WORKPLACE_GROUP = "SELECT c.pk.WKPID FROM BsymtAffWorkPlaceGroup c "
			+ " LEFT JOIN BsymtWorkplaceGroup wpg ON c.pk.WKPGRPID = wpg.pk.WKPGRPID" + " WHERE wpg.pk.CID = :CID"
			+ " AND c.pk.WKPID = :WKPID";

	/**
	 * insert ( 職場グループ所属情報 )
	 * 
	 * @param affWorkplaceGroup
	 */
	@Override
	public void insert(AffWorkplaceGroup affWorkplaceGroup) {
		this.commandProxy().insert(BsymtAffWorkPlaceGroup.toEntity(affWorkplaceGroup));
	}

	/**
	 * update ( 職場グループ所属情報 )
	 * 
	 * @param affWorkplaceGroup
	 */
	@Override
	public void update(AffWorkplaceGroup affWorkplaceGroup) {
		this.commandProxy().update(BsymtAffWorkPlaceGroup.toEntity(affWorkplaceGroup));
	}

	/**
	 * delete ( 会社ID, 職場グループID, 職場ID )
	 * 
	 * @param CID
	 * @param WKPGRPID
	 * @param WKPID
	 */
	@Override
	public void deleteAll(String CID, String WKPGRPID, String WKPID) {
		Optional<BsymtAffWorkPlaceGroup> entity = this.queryProxy().query(SELECT_BY_CID_CODE_WPID, BsymtAffWorkPlaceGroup.class)
				.setParameter("CID", CID).setParameter("WKPGRPID", WKPGRPID).setParameter("WKPID", WKPID)
				.getSingle();
		if (entity.isPresent())
			this.commandProxy().remove(entity.get());
	}

	/**
	 * delete ( 会社ID, 職場グループID )
	 * 
	 * @param CID
	 * @param WKPGRPID
	 */
	@Override
	public void deleteByWKPGRPID(String CID, String WKPGRPID) {
		List<BsymtAffWorkPlaceGroup> entities = this.queryProxy()
				.query(SELECT_BY_CID_CODE_WID, BsymtAffWorkPlaceGroup.class).setParameter("CID", CID)
				.setParameter("WKPGRPID", WKPGRPID)
				.getList();
		if (!CollectionUtil.isEmpty(entities)) {
			for(BsymtAffWorkPlaceGroup entity : entities) {
				this.commandProxy().remove(entity);				
			}
		}
	}

	/**
	 * delete ( 会社ID, 職場ID )
	 * 
	 * @param CID
	 * @param WKPID
	 */
	@Override
	public void deleteByWKPID(String CID, String WKPID) {
		Optional<BsymtAffWorkPlaceGroup> entity = this.queryProxy().query(SELECT_BY_CID_WPID, BsymtAffWorkPlaceGroup.class).setParameter("CID", CID)
				.setParameter("WKPID", WKPID).getSingle();
		if (entity.isPresent())
			this.commandProxy().remove(entity.get());
	}

	/**
	 * get ( 会社ID, 職場グループID, 職場ID )
	 * 
	 * @param CID
	 * @param WKPGRPID
	 * @param WKPID
	 * @return Optional<職場グループ所属情報>
	 */
	@Override
	public Optional<AffWorkplaceGroup> getByID(String CID, String WKPGRPID, String WKPID) {
		return this.queryProxy().query(SELECT_BY_CID_CODE_WPID, BsymtAffWorkPlaceGroup.class)
				.setParameter("CID", CID).setParameter("WKPGRPID", WKPGRPID).setParameter("WKPID", WKPID)
				.getSingle(c -> c.toDomain());
	}

	/**
	 * get ( 会社ID, 職場グループID, List<職場ID> )
	 * 
	 * @param CID
	 * @param WKPGRPID
	 * @param WKPID
	 * @return
	 */
	@Override
	public List<AffWorkplaceGroup> getByListID(String CID, String WKPGRPID, List<String> WKPID) {
		Set<String> lstWKPID = WKPID.stream().map(x -> x).collect(Collectors.toSet());
		return this.queryProxy().query(SELECT_BY_LIST_ID, BsymtAffWorkPlaceGroup.class).setParameter("CID", CID)
				.setParameter("WKPGRPID", WKPGRPID).setParameter("lstWPID", lstWKPID).getList(c -> c.toDomain());
	}

	/**
	 * exists ( 会社ID, 職場グループID, 職場ID )
	 * 
	 * @param CID
	 * @param WKPGRPID
	 * @param WKPID
	 * @return
	 */
	@Override
	public boolean checkExists(String CID, String WKPGRPID, String WKPID) {
		Optional<AffWorkplaceGroup> optional = this.getByID(CID, WKPGRPID, WKPID);
		return optional.isPresent();
	}

	/**
	 * get ( 会社ID, 職場ID )
	 * 
	 * @param CID
	 * @param WKPID
	 * @return Optional<職場グループ所属情報>
	 */
	@Override
	public Optional<AffWorkplaceGroup> getByWKPID(String CID, String WKPID) {
		return this.queryProxy().query(SELECT_BY_CID_WPID, BsymtAffWorkPlaceGroup.class).setParameter("CID", CID)
				.setParameter("WKPID", WKPID).getSingle(c -> c.toDomain());
	}

	/**
	 * get ( 会社ID, List<職場ID> )
	 * 
	 * @param CID
	 * @param WKPID
	 * @return
	 */
	@Override
	@TransactionAttribute(TransactionAttributeType.SUPPORTS)
	public List<AffWorkplaceGroup> getByListWKPID(String CID, List<String> WKPID) {
		Set<String> lstWKPID = WKPID.stream().map(x -> x).collect(Collectors.toSet());
		return this.queryProxy().query(SELECT_BY_CID_LIST_WPID, BsymtAffWorkPlaceGroup.class).setParameter("CID", CID)
				.setParameter("lstWPID", lstWKPID).getList(c -> c.toDomain());
	}

	/**
	 * exists ( 会社ID, 職場ID )
	 * 
	 * @param CID
	 * @param WKPID
	 * @return
	 */
	@Override
	public boolean checkExistsWKPID(String CID, String WKPID) {
		Optional<AffWorkplaceGroup> optional = this.getByWKPID(CID, WKPID);
		return optional.isPresent();
	}
	
	/**
	 * get ( 会社ID, 職場グループID )
	 * 
	 * @param CID
	 * @param WKPGRPID
	 * @return List<職場グループ所属情報>
	 */
	@Override
	public List<AffWorkplaceGroup> getByWKPGRPID(String CID, String WKPGRPID) {
		return this.queryProxy().query(SELECT_BY_CID_CODE_WID, BsymtAffWorkPlaceGroup.class).setParameter("CID", CID)
				.setParameter("WKPGRPID", WKPGRPID).getList(c->c.toDomain());
	}

	/**
	 * getAll ( 会社ID )
	 * 
	 * @param CID
	 * @return
	 */
	@Override
	public List<AffWorkplaceGroup> getAll(String CID) {
		return this.queryProxy().query(SELECT_BY_CID, BsymtAffWorkPlaceGroup.class).setParameter("CID", CID)
				.getList(c -> c.toDomain());
	}

	/**
	 * 職場グループに所属する職場を取得する
	 * 
	 * @param CID
	 * @param WKPGRPID
	 * @return List<職場ID>
	 */
	@Override
	public List<String> getWKPID(String CID, String WKPGRPID) {
		List<String> resultList = new ArrayList<>();
			resultList.addAll(this.queryProxy().query(SELECT_BY_DATE_COMPANY, String.class).setParameter("CID", CID)
					.setParameter("WKPGRPID", WKPGRPID).getList());
		return resultList;
	}

	/**
	 * 職場グループに所属する職場を取得する
	 * 
	 * @param CID
	 * @param WKPGRPCode
	 * @return
	 */
	@Override
	public List<String> getWKPIDbyCD(String CID, String WKPGRPCode) {
		List<String> resultList = new ArrayList<>();
		resultList.addAll(this.queryProxy().query(SELECT_WPID_BY_CODE, String.class).setParameter("CID", CID)
				.setParameter("WKPGRPCode", WKPGRPCode).getList());
		return resultList;
	}

	/**
	 * 職場が所属する職場グループを取得する
	 * 
	 * @param CID
	 * @param WKPID
	 * @return
	 */
	@Override
	public Optional<WorkplaceGroup> getWorkplaceGroup(String CID, String WKPID) {
		return this.queryProxy().query(SELECT_WORKPLACE_GROUP, BsymtWorkplaceGroup.class).setParameter("CID", CID)
				.setParameter("WKPID", WKPID).getSingle(c -> c.toDomain());
	}

	/**
	 * 職場が職場グループに所属しているか
	 * 
	 * @param CID
	 * @param WKPGRPID
	 * @return
	 */
	@Override
	public boolean checkWorkplace(String CID, String WKPGRPID) {
		Optional<AffWorkplaceGroup> affWorkplaceGroup = this.queryProxy()
				.query(CHECK_WORKPLACE_GROUP, BsymtAffWorkPlaceGroup.class).setParameter("CID", CID)
				.setParameter("WKPGRPID", WKPGRPID).getSingle(c -> c.toDomain());
		// TODO Auto-generated method stub
		return affWorkplaceGroup.isPresent();
	}

}
