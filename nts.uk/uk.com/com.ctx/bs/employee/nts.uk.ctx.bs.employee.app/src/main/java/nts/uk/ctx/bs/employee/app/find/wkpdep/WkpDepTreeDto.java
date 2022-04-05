package nts.uk.ctx.bs.employee.app.find.wkpdep;

import java.util.ArrayList;
import java.util.List;

import lombok.Value;

/**
 * 
 * @author HungTT
 *
 */
@Value
public class WkpDepTreeDto {

	private String id;
	private String code;
	// 職場名称
	private String name;
	// 階層コード
	private String hierarchyCode;
	// 職場総称
	private String workplaceGeneric;
	// 職場表示名
	private String workplaceDisplayName;
	private List<WkpDepTreeDto> children;


	public static WkpDepTreeDto toTreeDto(InformationDto dto) {
		return new WkpDepTreeDto(dto.getId(), dto.getCode(), dto.getName(), dto.getHierarchyCode(),
								dto.getGenericName(),
								dto.getDispName(),
								new ArrayList<>());
	}
}
