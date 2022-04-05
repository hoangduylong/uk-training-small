package nts.uk.shr.pereg.app.find;

import java.util.List;
import java.util.Map;

import nts.uk.shr.pereg.app.find.dto.OptionalItemDataDto;;

public interface PeregEmpOptRepository {
	/**
	 * get optional data of employee category type by record id 
	 * 
	 * @param recordId
	 * @return
	 */
	List<OptionalItemDataDto> getData(String recordId);
	
	/**
	 * get optional data of employee category type by record id list
	 * @param recordId
	 * @return
	 */
	Map<String, List<OptionalItemDataDto>> getDatas(List<String> recordId);
	
}
