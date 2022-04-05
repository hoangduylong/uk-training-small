package nts.uk.ctx.bs.employee.dom.workplace.group;

import java.util.List;
import java.util.Optional;

/**
 * 
 * @author phongtq
 *
 */
public interface AffWorkplaceGroupRespository {

	/**
	 * insert ( 職場グループ所属情報 )
	 * 
	 * @param affWorkplaceGroup
	 */
	public void insert(AffWorkplaceGroup affWorkplaceGroup);

	/**
	 * update ( 職場グループ所属情報 )
	 * 
	 * @param affWorkplaceGroup
	 */
	public void update(AffWorkplaceGroup affWorkplaceGroup);

	/**
	 * delete ( 会社ID, 職場グループID, 職場ID )
	 * 
	 * @param CID
	 * @param WKPGRPID
	 * @param WKPID
	 */
	public void deleteAll(String CID, String WKPGRPID, String WKPID);

	/**
	 * delete ( 会社ID, 職場グループID )
	 * 
	 * @param CID
	 * @param WKPGRPID
	 */
	public void deleteByWKPGRPID(String CID, String WKPGRPID);

	/**
	 * delete ( 会社ID, 職場ID )
	 * 
	 * @param CID
	 * @param WKPID
	 */
	public void deleteByWKPID(String CID, String WKPID);

	/**
	 * get ( 会社ID, 職場グループID, 職場ID )
	 * 
	 * @param CID
	 * @param WKPGRPID
	 * @param WKPID
	 * @return Optional<職場グループ所属情報>
	 */
	public Optional<AffWorkplaceGroup> getByID(String CID, String WKPGRPID, String WKPID);

	/**
	 * get ( 会社ID, 職場グループID, List<職場ID> )
	 * 
	 * @param CID
	 * @param WKPGRPID
	 * @param WKPID
	 * @return
	 */
	public List<AffWorkplaceGroup> getByListID(String CID, String WKPGRPID, List<String> WKPID);

	/**
	 * exists ( 会社ID, 職場グループID, 職場ID ) 
	 * 
	 * @param CID
	 * @param WKPGRPID
	 * @param WKPID
	 * @return
	 */
	public boolean checkExists(String CID, String WKPGRPID, String WKPID);

	/**
	 * get ( 会社ID, 職場ID )
	 * 
	 * @param CID
	 * @param WKPID
	 * @return Optional<職場グループ所属情報>
	 */
	public Optional<AffWorkplaceGroup> getByWKPID(String CID, String WKPID);

	/**
	 * get ( 会社ID, List<職場ID> )
	 * 
	 * @param CID
	 * @param WKPID
	 * @return
	 */
	public List<AffWorkplaceGroup> getByListWKPID(String CID, List<String> WKPID);
	
	/**
	 * exists ( 会社ID, 職場ID )
	 * 
	 * @param CID
	 * @param WKPID
	 * @return
	 */
	public boolean checkExistsWKPID(String CID, String WKPID);
	
	/**
	 * get ( 会社ID, 職場グループID )
	 * 
	 * @param CID
	 * @param WKPGRPID
	 * @return List<職場ID>
	 */
	public List<AffWorkplaceGroup> getByWKPGRPID(String CID, String WKPGRPID);
	
	/**
	 * getAll ( 会社ID )
	 * 
	 * @param CID
	 * @return
	 */
	public List<AffWorkplaceGroup> getAll(String CID);
	
	/**
	 * 職場グループに所属する職場を取得する
	 * 
	 * @param CID
	 * @param WKPGRPID
	 * @return List<職場ID>
	 */
	public List<String> getWKPID(String CID, String WKPGRPID);
	
	/**
	 * 職場グループに所属する職場を取得する
	 * 
	 * @param CID
	 * @param WKPGRPCode
	 * @return
	 */
	public List<String> getWKPIDbyCD(String CID, String WKPGRPCode);
	
	/**
	 * 職場が所属する職場グループを取得する
	 * 
	 * @param CID
	 * @param WKPID
	 * @return
	 */
	public Optional<WorkplaceGroup> getWorkplaceGroup(String CID, String WKPID);
	
	/**
	 * 職場が職場グループに所属しているか
	 * 
	 * @param CID
	 * @param WKPGRPID
	 * @return
	 */
	public boolean checkWorkplace(String CID, String WKPGRPID);
}
