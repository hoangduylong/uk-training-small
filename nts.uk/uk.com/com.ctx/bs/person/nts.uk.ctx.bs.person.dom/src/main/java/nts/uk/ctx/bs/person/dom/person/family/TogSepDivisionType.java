package nts.uk.ctx.bs.person.dom.person.family;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TogSepDivisionType {
	// 0: 同居 (Together)
	Together(0),
	// 1: 別居 (Separation)
	Separation(1);

	public final int value;
}
