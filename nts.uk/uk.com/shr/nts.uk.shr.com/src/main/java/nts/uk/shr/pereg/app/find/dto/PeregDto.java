/**
 * 
 */
package nts.uk.shr.pereg.app.find.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import lombok.Data;

/**
 * @author danpv
 *
 */
@Data
public class PeregDto {

	private PeregDomainDto domainDto;
	/**
	 * class of DTO
	 */
	private Class<?> dtoClass;

	private List<OptionalItemDataDto> optionalItemData;

	public PeregDto(PeregDomainDto dto, Class<?> dtoClass) {
		this.domainDto = dto;
		this.dtoClass = dtoClass;
	}

	public PeregDto(PeregDomainDto domainDto, Class<?> dtoClass, List<OptionalItemDataDto> optionalItemData) {
		super();
		this.domainDto = domainDto;
		this.dtoClass = dtoClass;
		this.optionalItemData = Optional.ofNullable(optionalItemData).orElse(new ArrayList<>());
	}

}
