package nts.uk.ctx.sys.portal.dom.mypage;

import java.util.Optional;

/**
 * 
 * @author hoatt
 *
 */
public interface MyPageRepository {
	/**
	 * get my page
	 * @param employeeId
	 * @param layoutId
	 * @return
	 */
	Optional<MyPage> getMyPage(String employeeId);
	/**
	 * add my page
	 * @param myPage
	 */
	void addMyPage(MyPage myPage);
}
