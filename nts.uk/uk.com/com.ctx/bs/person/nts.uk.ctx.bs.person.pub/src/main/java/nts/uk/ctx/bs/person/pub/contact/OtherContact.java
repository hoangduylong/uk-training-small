package nts.uk.ctx.bs.person.pub.contact;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OtherContact {
	/**
	 * NO
	 */
	private Integer no;

	/**
	 * 連絡先名
	 */
	private String address;
}
