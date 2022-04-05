package nts.uk.shr.pereg.app.find;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GridComboBoxSettingQuery {
	private String itemId;
	private GeneralDate baseDate;
	private boolean required;
}