package nts.uk.ctx.sys.portal.infra.repository.titlemenu;

import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.portal.dom.titlemenu.TitleMenu;
import nts.uk.ctx.sys.portal.dom.titlemenu.TitleMenuRepository;
import nts.uk.ctx.sys.portal.infra.entity.titlemenu.CcgmtTitleMenu;
import nts.uk.ctx.sys.portal.infra.entity.titlemenu.CcgmtTitleMenuPK;

@Stateless
/**
 * author hieult
 */
public class JpaTitleMenuRepository extends JpaRepository implements TitleMenuRepository{
	
	private static final String SELECT= "SELECT c FROM CcgmtTitleMenu c";
	private static final String SELECT_SINGLE = "SELECT c FROM CcgmtTitleMenu c WHERE c.ccgmtTitleMenuPK.companyID = :companyID AND c.ccgmtTitleMenuPK.titleMenuCD = :titleMenuCD";
	private static final String SELECT_ALL_BY_COMPANY = SELECT + " WHERE c.ccgmtTitleMenuPK.companyID = :companyID order by c.ccgmtTitleMenuPK.titleMenuCD";
	
	/**
     * Get list of TitleMenu
     * @param companyID
     * @return List of TitleMenu
     */
	@Override
	public List<TitleMenu> findAll(String companyID) {
		return this.queryProxy()
				.query(SELECT_ALL_BY_COMPANY, CcgmtTitleMenu.class)
				.setParameter("companyID", companyID)
				.getList(c -> toDomain(c));
	}
	/**
	 * Get Optional TitleMenu
	 * @param companyID
	 * @param titleMenuCD
	 * @return Optional of TitleMenu
	 */
	@Override
	public Optional<TitleMenu> findByCode(String companyID, String titleMenuCD) {
		return this.queryProxy()
				.query(SELECT_SINGLE, CcgmtTitleMenu.class)
				.setParameter("companyID", companyID)
				.setParameter("titleMenuCD", titleMenuCD)
				.getSingle(c -> toDomain(c));
	}
	/**
	 * Add
	 * @param title
	 * @return  
	 */
	@Override
	public void add(TitleMenu title) {
		this.commandProxy().insert(toEntity(title));
		}
	/**
	 * Update
	 * @param title
	 * @return 
	 */	
	@Override
	public void update(TitleMenu title) {
		CcgmtTitleMenu newEntity = toEntity(title);
		CcgmtTitleMenu updateEntity = this.queryProxy().find(newEntity.ccgmtTitleMenuPK, CcgmtTitleMenu.class).get();
		updateEntity.name = newEntity.name;
		updateEntity.layoutID = newEntity.layoutID;
		this.commandProxy().update(updateEntity);
				
	}
	/**
	 * Remove
	 * @param companyID 
	 * @param titleMenuCD
	 * @return 
	 */
	@Override
	public void remove(String companyID, String titleMenuCD) {
		this.commandProxy().remove(CcgmtTitleMenu.class, new CcgmtTitleMenuPK(companyID, titleMenuCD));
		this.getEntityManager().flush();
	}

	private TitleMenu toDomain(CcgmtTitleMenu entity) {
		return TitleMenu.createFromJavaType(
				entity.ccgmtTitleMenuPK.companyID,
				entity.ccgmtTitleMenuPK.titleMenuCD,
				entity.name,
				entity.layoutID);
	}
	private CcgmtTitleMenu toEntity (TitleMenu domain){
		return new CcgmtTitleMenu (
					new CcgmtTitleMenuPK(domain.getCompanyID(), domain.getTitleMenuCD().v()),
					domain.getName().v(),
					domain.getLayoutID());
	};
	

}

