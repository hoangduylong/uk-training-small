package nts.uk.ctx.sys.auth.pub.employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;

@Getter
@AllArgsConstructor
public class WorkPlaceAuthorityDto extends AggregateRoot {
	/**
	 * ロールID
	 */
	private String roleId;
	/**
	 * 会社ID
	 */
	private String companyId;
	/**
	 * NO
	 */
	private int functionNo;
	/**
	 * 利用できる
	 */
	private boolean availability;
	
}