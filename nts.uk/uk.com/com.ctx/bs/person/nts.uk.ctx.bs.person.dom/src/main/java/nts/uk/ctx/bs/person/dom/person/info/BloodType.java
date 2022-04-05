package nts.uk.ctx.bs.person.dom.person.info;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum BloodType {

	/* O RH+ */
	ORhPlus(3),
	/* O RH- */
	ORhSub(7),
	/* A RH+ */
	ARhPlus(1),
	/* A RH- */
	ARhSub(5),
	/* B RH+ */
	BRhPlus(2),
	/* B RH- */
	BRhSub(6),
	/* AB RH+ */
	ABRhPlus(4),
	/* AB RH- */
	ABRhSub(8);

	public final int value;

}
