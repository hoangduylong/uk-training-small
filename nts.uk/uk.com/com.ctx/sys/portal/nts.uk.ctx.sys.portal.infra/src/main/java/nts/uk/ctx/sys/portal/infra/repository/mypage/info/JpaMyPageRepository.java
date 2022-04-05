package nts.uk.ctx.sys.portal.infra.repository.mypage.info;

import java.util.Optional;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.portal.dom.mypage.MyPage;
import nts.uk.ctx.sys.portal.dom.mypage.MyPageRepository;
import nts.uk.ctx.sys.portal.infra.entity.mypage.CcgptMyPage;
import nts.uk.ctx.sys.portal.infra.entity.mypage.CcgptMyPagePK;
/**
 * 
 * @author hoatt
 *
 */
@Stateless
public class JpaMyPageRepository extends JpaRepository implements MyPageRepository {

	private static final String SELECT_MYPAGE = "SELECT c FROM CcgptMyPage c"
			+ " WHERE c.ccgptMyPagePK.employeeId = :employeeId";
	private static MyPage toDomain(CcgptMyPage entity){
		val domain = MyPage.createFromJavaType(entity.ccgptMyPagePK.employeeId, entity.layoutId);
		return domain;
	}
	private static CcgptMyPage toEntity(MyPage domain){
		val entity = new CcgptMyPage();
		entity.ccgptMyPagePK = new CcgptMyPagePK();
		entity.ccgptMyPagePK.employeeId = domain.getEmployeeId();
		entity.layoutId = domain.getLayoutId();
		return entity;
	}
	/**
	 * get my page
	 * @param employeeId
	 * @param layoutId
	 * @return
	 */
	@Override
	public Optional<MyPage> getMyPage(String employeeId) {
		return  this.queryProxy().query(SELECT_MYPAGE, CcgptMyPage.class)
				.setParameter("employeeId", employeeId)
				.getSingle(c->toDomain(c));
	}
	/**
	 * add my page
	 * @param myPage
	 */
	@Override
	public void addMyPage(MyPage myPage) {
		this.commandProxy().insert(toEntity(myPage));
	}

}
