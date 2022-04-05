/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.ws.classification;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.app.command.classification.ClfRemoveCommand;
import nts.uk.ctx.bs.employee.app.command.classification.ClfRemoveCommandHandler;
import nts.uk.ctx.bs.employee.app.command.classification.ClfSaveCommand;
import nts.uk.ctx.bs.employee.app.command.classification.ClfSaveCommandHandler;
import nts.uk.ctx.bs.employee.app.find.classification.ClassificationFinder;
import nts.uk.ctx.bs.employee.app.find.classification.dto.ClassificationFindDto;

/**
 * The Class ManagementCategoryWs.
 */
@Path("bs/employee/classification")
@Produces(MediaType.APPLICATION_JSON)
public class ClassificationWs extends WebService{

	/** The finder. */
	@Inject
	private ClassificationFinder finder;
	
	/** The save handler. */
	@Inject
	private ClfSaveCommandHandler saveHandler;
	
	/** The remove handler. */
	@Inject
	private ClfRemoveCommandHandler removeHandler;
	
	
	/**
	 * Find all.
	 *
	 * @return the list
	 */
	@Path("findAll")
	@POST
	public List<ClassificationFindDto> findAll() {
		return this.finder.findAll();
	}
	
	/**
	 * Find classification.
	 *
	 * @return the item
	 */
	@Path("find/{classificationCode}")
	@POST
	public ClassificationFindDto findByCode(@PathParam("classificationCode") String code) {
		return this.finder.findClassificationByCode(code);
	}
	
	/**
	 * Save.
	 *
	 * @param command the command
	 */
	@Path("save")
	@POST
	public void save(ClfSaveCommand command) {
		this.saveHandler.handle(command);
	}
	
	/**
	 * Removes the.
	 *
	 * @param command the command
	 */
	@Path("remove")
	@POST
	public void remove(ClfRemoveCommand command) {
		this.removeHandler.handle(command);
	}
	
	@POST
	@Path("getClsNameByCds")
	public List<String> getClsNameByListCode(List<String> codes) {
		List<String> names = new ArrayList<>();
		if (codes == null || codes.isEmpty()) return names;
		names = codes.stream().map(cd -> this.finder.findClassificationByCode(cd).getName()).collect(Collectors.toList());
		return names;
	}
}
