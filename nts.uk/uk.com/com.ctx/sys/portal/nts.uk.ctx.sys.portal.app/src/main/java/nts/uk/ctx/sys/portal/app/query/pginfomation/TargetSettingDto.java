package nts.uk.ctx.sys.portal.app.query.pginfomation;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TargetSettingDto {
	
	/**
	 * 使用区分
	 */
	private Integer usageCategory;
	
	/**
	 * 活性区分
	 */
	private Integer activeCategory;
}
