package nts.uk.ctx.bs.employee.dom.workplace.group;

import java.util.List;
import java.util.Optional;

public interface WorkplaceGroupRespository {
	
	/**
	 * insert ( 職場グループ )
	 * @param group
	 */
	public void insert (WorkplaceGroup group);
	
	/**
	 * update ( 職場グループ )
	 * @param group
	 */
	public void update (WorkplaceGroup group);
	
	/**
	 * delete ( 会社ID, 職場グループID )
	 * @param CID
	 * @param WKPGRPID
	 */
	public void delete (String CID, String WKPGRPID);
	
	/**
	 * get WorkplaceGroup ( 会社ID, 職場グループID )
	 * @param CID
	 * @param WKPGRPID
	 * @return
	 */
	public Optional<WorkplaceGroup> getById(String CID, String WKPGRPID);

	/**
	 * get List<WorkplaceGroup> ( 会社ID, List<職場グループID> )
	 * @param CID
	 * @param lstWKPGRPID
	 * @return
	 */
	public List<WorkplaceGroup> getAllById(String CID, List<String> lstWKPGRPID);
	
	/**
	 * exists ( 会社ID, 職場グループID )
	 * @param CID
	 * @param WKPGRPID
	 * @return
	 */
	public boolean checkExistsById (String CID, String WKPGRPID);
	
	/**
	 * get ( 会社ID, 職場グループコード )
	 * @param CID
	 * @param WKPGRPCode
	 */
	public Optional<WorkplaceGroup> getByCode (String CID, String WKPGRPCode);
	
	/**
	 * get ( 会社ID, List<職場グループコード> )
	 * @param CID
	 * @param WKPGRPCode
	 * @return
	 */
	public List<WorkplaceGroup> getListByCode (String CID, List<String> WKPGRPCode);
	
	/**
	 * exists ( 会社ID, 職場グループコード )
	 * @param CID
	 * @param WKPGRPCode
	 * @return
	 */
	public boolean checkExistsByCode (String CID, String WKPGRPCode);
	
	/**
	 * getAll ( 会社ID )
	 * @param CID
	 * @return
	 */
	public List<WorkplaceGroup> getAll (String CID);
}
