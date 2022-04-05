package nts.uk.shr.pereg.app;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TestCommand {

	@PeregItem("IS00001")
	private String fullName;
	
	@PeregItem("IS00002")
	private String fullNameKana;
}
