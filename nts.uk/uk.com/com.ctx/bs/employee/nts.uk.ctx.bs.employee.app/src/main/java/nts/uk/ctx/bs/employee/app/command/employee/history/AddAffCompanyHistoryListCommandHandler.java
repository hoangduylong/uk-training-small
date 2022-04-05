package nts.uk.ctx.bs.employee.app.command.employee.history;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.gul.text.IdentifierUtil;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHist;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistByEmployee;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistItem;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistRepository;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistService;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyInfo;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyInfoRepository;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.pereg.app.command.MyCustomizeException;
import nts.uk.shr.pereg.app.command.PeregAddListCommandHandler;
@Stateless
public class AddAffCompanyHistoryListCommandHandler extends CommandHandlerWithResult<List<AddAffCompanyHistoryCommand>, List<MyCustomizeException>>
implements PeregAddListCommandHandler<AddAffCompanyHistoryCommand>{
	@Inject
	private AffCompanyHistRepository affCompanyHistRepository;

	@Inject
	private AffCompanyInfoRepository affCompanyInfoRepository;

	@Inject
	private AffCompanyHistService affCompanyHistService;
	@Override
	public String targetCategoryCd() {
		// TODO Auto-generated method stub
		return "CS00003";
	}

	@Override
	public Class<?> commandClass() {
		// TODO Auto-generated method stub
		return AddAffCompanyHistoryCommand.class;
	}

	@Override
	protected List<MyCustomizeException> handle(CommandHandlerContext<List<AddAffCompanyHistoryCommand>> context) {
		List<AddAffCompanyHistoryCommand> command = context.getCommand();
		List<MyCustomizeException> result= new ArrayList<>();
		//sidsPidsMap
		List<String> sids = command.stream().map(c -> c.getSId()).collect(Collectors.toList());
		Map<String, List<AffCompanyHist>> histLstMap = this.affCompanyHistRepository
				.getAffCompanyHistoryOfEmployees(sids).stream()
				.collect(Collectors.groupingBy(c -> c.getPId()));
		Map<String, AffCompanyHistByEmployee> itemToBeAddedMap = new HashMap<>();
		List<AffCompanyInfo> affCompanyInfoLst = new ArrayList<>();
		Map<String, String> recordIds = new HashMap<>();
		command.stream().forEach(c ->{
			try {
			AffCompanyHistByEmployee itemToBeAdded = new AffCompanyHistByEmployee(c.getSId(), new ArrayList<>());
			List<AffCompanyHist> listHist = histLstMap.get(c.getSId());
			if(listHist != null) {
				if(listHist.size() > 0) {
					itemToBeAdded = listHist.get(0).getAffCompanyHistByEmployee(c.getSId());
				}
			}
			
			// 所属期間．終了日が指定されない場合（＝退職していない）、所属期間．終了日＝9999/12/31を自動的に設定する。
			String newHistId = IdentifierUtil.randomUniqueId();
			AffCompanyHistItem hist = new AffCompanyHistItem(newHistId, false,
					new DatePeriod(c.getStartDate() != null ? c.getStartDate() : ConstantUtils.minDate(),
							c.getEndDate() != null ? c.getEndDate() : ConstantUtils.maxDate()));
			itemToBeAdded.add(hist);
			itemToBeAddedMap.put(c.getPId(), itemToBeAdded);
			
			AffCompanyInfo histItem = AffCompanyInfo.createFromJavaType(c.getSId(),
					newHistId, !StringUtils.isEmpty(c.getRecruitmentClassification())
							? c.getRecruitmentClassification() : " ",
					c.getAdoptionDate(), c.getRetirementAllowanceCalcStartDate());
			affCompanyInfoLst.add(histItem);
			recordIds.put(c.getSId(), newHistId);
			
			}catch(BusinessException e) {
				MyCustomizeException ex = new MyCustomizeException(e.getMessageId(), Arrays.asList(c.getSId()));
				result.add(ex);
			}
			
		});
		if(!itemToBeAddedMap.isEmpty()) {
			affCompanyHistService.addAll(itemToBeAddedMap);
		}
		
		if(!affCompanyInfoLst.isEmpty()) {
			affCompanyInfoRepository.addAll(affCompanyInfoLst);
		}
		
		if(!recordIds.isEmpty()) {
			result.add(new MyCustomizeException("NOERROR", recordIds));
		}
		return result;
	}

}
