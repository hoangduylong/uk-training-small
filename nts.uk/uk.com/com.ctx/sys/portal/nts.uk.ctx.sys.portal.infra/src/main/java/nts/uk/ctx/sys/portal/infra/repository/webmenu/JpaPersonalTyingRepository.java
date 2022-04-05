package nts.uk.ctx.sys.portal.infra.repository.webmenu;

import java.util.List;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.portal.dom.webmenu.personaltying.PersonalTying;
import nts.uk.ctx.sys.portal.dom.webmenu.personaltying.PersonalTyingRepository;
import nts.uk.ctx.sys.portal.infra.entity.webmenu.CcgstPersonTying;
import nts.uk.ctx.sys.portal.infra.entity.webmenu.CcgstPersonTyingPK;
/**
 * 
 * @author phongtq
 *
 */
@Stateless
public class JpaPersonalTyingRepository extends JpaRepository implements PersonalTyingRepository {
	
	private static final String REMOVE_ALL;
	
	private static final String FIND_ALL;

	static {
		StringBuilder builderString = new StringBuilder();
		builderString.append("DELETE FROM CcgstPersonTying e");
		builderString.append(" WHERE e.ccgstPersonTyingPK.companyId= :companyId");
		builderString.append(" AND e.ccgstPersonTyingPK.employeeId = :employeeId");
		REMOVE_ALL = builderString.toString(); 
		
		builderString = new StringBuilder();
		builderString.append("SELECT e FROM CcgstPersonTying e");
		builderString.append(" WHERE e.ccgstPersonTyingPK.companyId = :companyId");
		builderString.append(" AND e.ccgstPersonTyingPK.employeeId = :employeeId");
		FIND_ALL = builderString.toString();
	}

	/**
	 * Add new personal tying
	 */
	@Override
	public void add(PersonalTying personalTying) {
		this.commandProxy().insert(convertToDbType(personalTying));
	}

	/**
	 * Delete personal tying
	 */
	@Override
	public void delete(String companyId, String employeeId) {
		this.getEntityManager().createQuery(REMOVE_ALL)
		.setParameter("companyId", companyId)
		.setParameter("employeeId", employeeId)
		.executeUpdate();
	}

	/**
	 * Convert to database
	 * @param personalTying
	 * @return
	 */
	private CcgstPersonTying convertToDbType(PersonalTying personalTying) {
		CcgstPersonTying ccgstPersonTying = new CcgstPersonTying();
		CcgstPersonTyingPK cPersonTyingPK = new CcgstPersonTyingPK(personalTying.getCompanyId(),
				personalTying.getWebMenuCode(), personalTying.getEmployeeId());
		ccgstPersonTying.ccgstPersonTyingPK = cPersonTyingPK;
		return ccgstPersonTying;
	}

	/**
	 * Find all personal tying by companyId and employeeId
	 */
	@Override
	public List<PersonalTying> findAll(String companyId, String employeeId) {
		return this.queryProxy().query(FIND_ALL, CcgstPersonTying.class)
				.setParameter("companyId", companyId)
				.setParameter("employeeId", employeeId)
				.getList(c -> convertToDomain(c));
	}
	
	/**
	 * Convert to domain
	 * @param ccgstPersonTying
	 * @return
	 */
	private PersonalTying convertToDomain(CcgstPersonTying ccgstPersonTying){
		PersonalTying personalTying = PersonalTying.createFromJavaType(
				ccgstPersonTying.ccgstPersonTyingPK.companyId,
				ccgstPersonTying.ccgstPersonTyingPK.webMenuCode,
				ccgstPersonTying.ccgstPersonTyingPK.employeeId
				);
		return personalTying;
	}

}
