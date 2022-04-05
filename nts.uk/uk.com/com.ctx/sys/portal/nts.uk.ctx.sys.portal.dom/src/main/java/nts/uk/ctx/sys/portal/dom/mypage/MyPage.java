package nts.uk.ctx.sys.portal.dom.mypage;

import java.util.UUID;

import lombok.EqualsAndHashCode;
import lombok.Value;
import nts.arc.layer.dom.AggregateRoot;

/**
 * The Class MyPage.
 */
@Value
@EqualsAndHashCode(callSuper = false)
public class MyPage extends AggregateRoot {
	
	/** The employee id. */
	private String employeeId;
	
	/** The layout id. */
	private String layoutId;

	/**
	 * Instantiates a new my page.
	 *
	 * @param employeeId the employee id
	 * @param layoutId the layout id
	 */
	public MyPage(String employeeId, String layoutId) {	
		this.employeeId = employeeId;
		this.layoutId = layoutId;
	}	
	
	/**
	 * Creates the from java type.
	 *
	 * @param employeeId the employee id
	 * @param layoutId the layout id
	 */
	public static MyPage createFromJavaType(String employeeId, String LayoutId) {
		return new MyPage(employeeId, LayoutId);
	}
	/**
	 * hoatt
	 * create new my page
	 * @param employeeId
	 * @return
	 */
	public static MyPage createNew(String employeeId) {	
		return new MyPage(employeeId, UUID.randomUUID().toString());
	}
}
