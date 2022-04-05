package nts.uk.ctx.bs.person.dom.person.info;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum GenderPerson {
	
	/* 男 */
	Male(1),
	
	/* 女 */
	Female(2);
	
	public final int value;
}