package nts.uk.ctx.sys.auth.dom.wplmanagementauthority;

import java.util.List;
import java.util.Optional;

public interface WorkPlaceFunctionRepository {
	/**
	 * get all WorkPlaceFunction
	 * @return
	 */
	List<WorkPlaceFunction> getAllWorkPlaceFunction();
	/**
	 * get WorkPlaceFunction by functionNo
	 * @param functionNo
	 * @return
	 */
	Optional<WorkPlaceFunction> getWorkPlaceFunctionById(int functionNo);
}
