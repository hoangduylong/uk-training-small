package nts.uk.ctx.sys.portal.dom.notice.adapter;

import java.util.List;

import lombok.Builder;
import lombok.Data;

/**
 * Dto 対象情報
 */
@Data
@Builder
public class TargetInformationDto {
	
	/** 対象社員ID */
	private List<String> targetSIDs;
	
	/** 対象職場ID */
	private List<String> targetWpids;
	
	/** 宛先区分 */
	private Integer destination;
}
