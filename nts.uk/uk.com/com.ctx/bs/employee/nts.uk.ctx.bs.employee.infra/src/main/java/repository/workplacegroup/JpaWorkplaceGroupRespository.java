package repository.workplacegroup;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import entity.workplacegroup.BsymtWorkplaceGroup;
import entity.workplacegroup.BsymtWorkplaceGroupPk;
import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupRespository;

/**
 * 職場グループRepository
 * @author phongtq
 *
 */
@Stateless
public class JpaWorkplaceGroupRespository extends JpaRepository implements WorkplaceGroupRespository {

	private static final String SELECT = "SELECT c FROM BsymtWorkplaceGroup c ";

	private static final String SELECT_BY_CID = SELECT + " WHERE c.pk.CID = :CID";

	private static final String SELECT_BY_CID_ORDER = SELECT + " WHERE c.pk.CID = :CID ORDER BY c.WKPGRPCode ASC";

	private static final String SELECT_BY_CID_CODE_WID = SELECT_BY_CID + " AND c.pk.WKPGRPID = :WKPGRPID";

	private static final String SELECT_BY_LIST_ID = SELECT_BY_CID + " AND c.pk.WKPGRPID IN :lstWKPGRPID ORDER BY c.WKPGRPCode ASC";

	private static final String SELECT_BY_CID_CODE_WCD = SELECT_BY_CID + " AND c.WKPGRPCode = :WKPGRPCode";

	private static final String SELECT_BY_LIST_CD = SELECT_BY_CID + " AND c.WKPGRPCode IN :lstWKPGRPCode ORDER BY c.WKPGRPCode ASC";


	/**
	 * insert ( 職場グループ )
	 * @param group
	 */
	@Override
	public void insert(WorkplaceGroup group) {
		this.commandProxy().insert(BsymtWorkplaceGroup.toEntity(group));
	}

	/**
	 * update ( 職場グループ )
	 * @param group
	 */
	@Override
	public void update(WorkplaceGroup group) {
		Optional<BsymtWorkplaceGroup> workPlaceGroup = this.queryProxy().query(SELECT_BY_CID_CODE_WID, BsymtWorkplaceGroup.class)
				.setParameter("CID", group.getCID())
				.setParameter("WKPGRPID", group.getId())
				.getSingle();
		if(workPlaceGroup.isPresent()){
			BsymtWorkplaceGroup newData = workPlaceGroup.get();
			newData.fromEntity(group);
			this.commandProxy().update(newData);
		}
	}

	/**
	 * delete ( 会社ID, 職場グループID )
	 * @param CID
	 * @param WKPGRPID
	 */
	@Override
	public void delete(String CID, String WKPGRPID) {
		Optional<WorkplaceGroup> wpGroup = this.getById(CID, WKPGRPID);

		if(wpGroup.isPresent())
			this.commandProxy().remove(BsymtWorkplaceGroup.class, new BsymtWorkplaceGroupPk(CID, WKPGRPID));
	}

	/**
	 * get WorkplaceGroup ( 会社ID, 職場グループID )
	 * @param CID
	 * @param WKPGRPID
	 * @return
	 */
	@Override
	public Optional<WorkplaceGroup> getById(String CID, String WKPGRPID) {
		return this.queryProxy().query(SELECT_BY_CID_CODE_WID, BsymtWorkplaceGroup.class)
				.setParameter("CID", CID)
				.setParameter("WKPGRPID", WKPGRPID)
				.getSingle(c->c.toDomain());
	}

	/**
	 * get List<WorkplaceGroup> ( 会社ID, List<職場グループID> )
	 * @param CID
	 * @param lstWKPGRPID
	 * @return
	 */
	@Override
	public List<WorkplaceGroup> getAllById(String CID, List<String> lstWKPGRPID) {
		Set<String> lstWKPGRP = lstWKPGRPID.stream().map(x -> x).collect(Collectors.toSet());
		return this.queryProxy().query(SELECT_BY_LIST_ID, BsymtWorkplaceGroup.class)
				.setParameter("CID", CID)
				.setParameter("lstWKPGRPID", lstWKPGRP)
				.getList(c -> c.toDomain());
	}

	/**
	 * exists ( 会社ID, 職場グループID )
	 * @param CID
	 * @param WKPGRPID
	 * @return
	 */
	@Override
	public boolean checkExistsById(String CID, String WKPGRPID) {
		Optional<WorkplaceGroup> optional = this.getById(CID, WKPGRPID);
		return optional.isPresent();
	}

	/**
	 * get ( 会社ID, 職場グループコード )
	 * @param CID
	 * @param WKPGRPCode
	 */
	@Override
	public Optional<WorkplaceGroup> getByCode(String CID, String WKPGRPCode) {
		return this.queryProxy().query(SELECT_BY_CID_CODE_WCD, BsymtWorkplaceGroup.class)
				.setParameter("CID", CID)
				.setParameter("WKPGRPCode", WKPGRPCode)
				.getSingle(c->c.toDomain());
	}

	/**
	 * get ( 会社ID, List<職場グループコード> )
	 * @param CID
	 * @param WKPGRPCode
	 * @return
	 */
	@Override
	public List<WorkplaceGroup> getListByCode(String CID, List<String> WKPGRPCode) {
		Set<String> lstWKPGRP = WKPGRPCode.stream().map(x -> x).collect(Collectors.toSet());
		return this.queryProxy().query(SELECT_BY_LIST_CD, BsymtWorkplaceGroup.class)
				.setParameter("CID", CID)
				.setParameter("lstWKPGRPCode", lstWKPGRP)
				.getList(c -> c.toDomain());
	}

	/**
	 * exists ( 会社ID, 職場グループコード )
	 * @param CID
	 * @param WKPGRPCode
	 * @return
	 */
	@Override
	public boolean checkExistsByCode(String CID, String WKPGRPCode) {
		return this.queryProxy().query(SELECT_BY_CID_CODE_WID, BsymtWorkplaceGroup.class)
				.setParameter("CID", CID)
				.setParameter("WKPGRPID", WKPGRPCode)
				.getSingle(c->c.toDomain()).isPresent();
	}

	/**
	 * getAll ( 会社ID )
	 * @param CID
	 * @return
	 */
	@Override
	public List<WorkplaceGroup> getAll(String CID) {
		return this.queryProxy().query(SELECT_BY_CID_ORDER, BsymtWorkplaceGroup.class)
				.setParameter("CID", CID)
				.getList(c -> c.toDomain());
	}

}
