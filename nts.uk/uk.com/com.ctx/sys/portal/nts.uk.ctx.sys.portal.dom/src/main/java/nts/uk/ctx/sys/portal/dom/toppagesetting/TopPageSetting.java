package nts.uk.ctx.sys.portal.dom.toppagesetting;

import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.AggregateRoot;

/**
 * The Class TopPageSetting
 * Domain  トップページの設定
 * @author sonnh1
 * 
 * 
 */
@Getter
public class TopPageSetting extends AggregateRoot {

	private String companyId;

	private CategorySetting categorySet;

	public TopPageSetting(String companyId, CategorySetting categorySet) {
		super();
		this.companyId = companyId;
		this.categorySet = categorySet;
	}

	/**
	 * Convert to type of TopPageSetting
	 * 
	 * @param companyId
	 * @param ctgSet
	 * @return
	 */
	public static TopPageSetting createFromJavaType(String companyId, int categorySet) {
		return new TopPageSetting(companyId, EnumAdaptor.valueOf(categorySet, CategorySetting.class));
	}
}
