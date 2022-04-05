package nts.uk.shr.infra.file.report.masterlist.data;

import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;

@Data
@Builder
public class MasterCellData {

	private String columnId;

	private Object value;

	@Default
	private MasterCellStyle style = MasterCellStyle.build();

	public void setStyle(MasterCellStyle style) {
		if (style != null) {
			this.style = style;
		}
	}
}
