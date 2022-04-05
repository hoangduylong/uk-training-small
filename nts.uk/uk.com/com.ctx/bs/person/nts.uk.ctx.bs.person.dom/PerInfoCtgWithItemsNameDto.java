package find.person.info.category;

import java.util.List;

import lombok.Value;

@Value
public class PerInfoCtgWithItemsNameDto {
	private String id;
	private String categoryName;
	private int categoryType;
	private int isFixed;
	private List<String> itemNameList;
}
