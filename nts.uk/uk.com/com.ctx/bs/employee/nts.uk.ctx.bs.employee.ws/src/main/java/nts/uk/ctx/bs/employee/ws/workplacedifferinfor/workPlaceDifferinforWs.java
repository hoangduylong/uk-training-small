package nts.uk.ctx.bs.employee.ws.workplacedifferinfor;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.app.command.workplace.workplacedifferinfor.AddDivWorkPlaceDifferInforCommand;
import nts.uk.ctx.bs.employee.app.command.workplace.workplacedifferinfor.AddDivWorkPlaceDifferInforCommandHandler;
import nts.uk.ctx.bs.employee.app.command.workplace.workplacedifferinfor.DeleteDivWorkPlaceDifferInforCommand;
import nts.uk.ctx.bs.employee.app.command.workplace.workplacedifferinfor.DeleteDivWorkPlaceDifferInforCommandHandler;
import nts.uk.ctx.bs.employee.app.command.workplace.workplacedifferinfor.UpdateDivWorkPlaceDifferInforCommand;
import nts.uk.ctx.bs.employee.app.command.workplace.workplacedifferinfor.UpdateDivWorkPlaceDifferInforCommandHandler;
import nts.uk.ctx.bs.employee.app.find.workplacedifferinfor.DivWorkPlaceDifferInforDto;
import nts.uk.ctx.bs.employee.app.find.workplacedifferinfor.DivWorkPlaceDifferInforFinder;
import nts.uk.ctx.bs.employee.app.find.workplacedifferinfor.ParamFinder;

@Path("bs/employee/workplacedifferinfor")
@Produces("application/json")
public class workPlaceDifferinforWs extends WebService{
	@Inject
	private DivWorkPlaceDifferInforFinder findDiv;
	@Inject
	private UpdateDivWorkPlaceDifferInforCommandHandler updateDiv;
	@Inject
	private AddDivWorkPlaceDifferInforCommandHandler addDiv;
	@Inject
	private DeleteDivWorkPlaceDifferInforCommandHandler delDiv;
	
	/**
	 * find a div
	 * @param param
	 * @return
	 */
	@POST
	@Path("findDiv")
	public DivWorkPlaceDifferInforDto finderDiv(ParamFinder param){
		return this.findDiv.finder(param);
	}
	
	/**
	 * add a div
	 * @param div
	 */
	@POST
	@Path("addDiv")
	public void add(AddDivWorkPlaceDifferInforCommand div){
		this.addDiv.handle(div);
	}
	
	/**
	 * update a div
	 * @param div
	 */
	@POST
	@Path("updateDiv")
	public void update(UpdateDivWorkPlaceDifferInforCommand div){
		this.updateDiv.handle(div);
	}
	
	/**
	 * delete a div
	 * @param div
	 */
	@POST
	@Path("delDiv")
	public void delete(DeleteDivWorkPlaceDifferInforCommand div){
		this.delDiv.handle(div);
	}
}
