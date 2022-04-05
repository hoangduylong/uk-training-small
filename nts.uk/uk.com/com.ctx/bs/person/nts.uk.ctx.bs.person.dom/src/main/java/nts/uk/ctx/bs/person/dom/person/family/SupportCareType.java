package nts.uk.ctx.bs.person.dom.person.family;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum SupportCareType {

	// 1: なし (None)
	None(1),
	// 2: 要支援1 (NecessarySupport1)
	NecessarySupport1(2),
	// 3: 要支援2 (NecessarySupport2)
	NecessarySupport2(3),
	// 4: 要介護1 (NecessaryCare1)
	NecessaryCare1(4),
	// 5: 要介護2 (NecessaryCare2)
	NecessaryCare2(5),
	// 6: 要介護3 (NecessaryCare3)
	NecessaryCare3(6),
	// 7: 要介護4 (NecessaryCare4)
	NecessaryCare4(7),
	// 8: 要介護5 (NecessaryCare5)
	NecessaryCare5(8);

	public final int value;

}
