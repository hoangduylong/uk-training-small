package nts.uk.ctx.bs.company.app.command.company;

import javax.ejb.Stateless;
import javax.inject.Inject;

//import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.company.dom.company.AddInfor;
import nts.uk.ctx.bs.company.dom.company.Company;
import nts.uk.ctx.bs.company.dom.company.CompanyRepository;
import nts.uk.shr.com.context.AppContexts;
/**
 * update a company infor item
 * @author yennth
 */
@Stateless
public class UpdateCompanyInforCommandHandler extends CommandHandler<UpdateCompanyInforCommand>{
	@Inject
	private CompanyRepository comRep;

	/**
	 * update a company
	 */
	@Override
	protected void handle(CommandHandlerContext<UpdateCompanyInforCommand> context) {
		UpdateCompanyInforCommand data = context.getCommand();
		String contractCd = AppContexts.user().contractCode();
		AddInfor add = null; 
		if(data.getAddinfor() != null){
			add = data.getAddinfor().toDomainAdd(Company.createCompanyId(data.getCcd(), data.getContractCd()));
		}
		Company company =  Company.createFromJavaType(data.getCcd(), data.getName(), 
																		data.getMonth(), 
																		data.getAbolition(), data.getRepname(),
																		data.getRepJob(), data.getComNameKana(), 
																		data.getShortComName(), contractCd, 
																		data.getTaxNo(), add);
		company.validate();
		// if company be discarded: true-1: be discarded, false-0: be not discarded
		if (company.isAbolition()) {
			// check number company discarded, can't discard all list company 
			company.checkAbolition(comRep.checkAbolish(company.getCompanyId()));
		}
		comRep.updateCom(company);
		
	}
}
