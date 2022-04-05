package nts.uk.ctx.bs.employee.app.command.itemvalue;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class FamilyCommand {
	List<ItemDefinitionValueCommand> items;
}
