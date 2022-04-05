package nts.uk.ctx.sys.log.app.find.reference;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.uk.ctx.sys.log.dom.reference.LogSetOutputItem;

/*
 * author: thuong.tv
 */

@Data
@AllArgsConstructor
public class LogSetOutputItemDto {

	public LogSetOutputItemDto() {
		super();
	}

	/** ID */
	private String logSetId;
	
	// 項目NO
	/** The Item NO. */
	private int itemNo;

	// 表示順
	/** The Display Order*/
	private int displayOrder;
	
	// 囲い文字
	/** The use flag. */
	private int isUseFlag;
	
	/** The list of log setting output item detail. */
	private List<LogSetItemDetailDto> logSetItemDetails; 

	public static LogSetOutputItemDto fromDomain(LogSetOutputItem domain) {
		int isUseFlag = domain.isUseFlag() ? 1 : 0;
		return new LogSetOutputItemDto(domain.getLogSetId(), domain.getItemNo(), domain.getDisplayOrder(), isUseFlag,
				domain.getLogSetItemDetails().stream().map(item -> LogSetItemDetailDto.fromDomain(item))
						.sorted(new Comparator<LogSetItemDetailDto>() {
							@Override
							public int compare(LogSetItemDetailDto o1, LogSetItemDetailDto o2) {
								return o1.getFrame() - o2.getFrame();
							}
						}).collect(Collectors.toList()));
	}
}
