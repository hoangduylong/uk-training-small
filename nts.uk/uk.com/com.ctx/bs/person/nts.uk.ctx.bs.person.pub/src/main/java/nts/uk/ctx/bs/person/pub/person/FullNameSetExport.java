package nts.uk.ctx.bs.person.pub.person;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class FullNameSetExport {
	/** 氏名 - FullName */
	private String fullName;

	/** 氏名カナ - FullNameKana */
	private String fullNameKana;
}
