package nts.uk.ctx.bs.person.pub.family;

import java.util.List;

public interface FamilyPub {
	/**
	 * [RQ623]個人IDから配偶者のローマ字名を取得する
	 * @param pid
	 * @return
	 */
	public List<FamilyExport623> getRomajiOfFamilySpouseByPid(String pid);
}
