package nts.uk.ctx.bs.person.dom.person.family.fullnameset;

import lombok.Getter;
import nts.uk.ctx.bs.person.dom.person.info.fullnameset.FullName;
import nts.uk.ctx.bs.person.dom.person.info.fullnameset.FullNameKana;
@Getter
public class FullNameSet {
	/** 氏名 - FullName */
	private FullName fullName;

	/** 氏名カナ - FullNameKana */
	private FullNameKana fullNameKana;

	public FullNameSet(String fullName, String fullNameKana) {
		super();
		this.fullName = new FullName(fullName);
		this.fullNameKana = new FullNameKana(fullNameKana);
	}
}
