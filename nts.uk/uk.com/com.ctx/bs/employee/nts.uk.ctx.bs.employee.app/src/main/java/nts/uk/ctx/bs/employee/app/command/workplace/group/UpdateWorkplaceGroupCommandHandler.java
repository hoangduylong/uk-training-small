package nts.uk.ctx.bs.employee.app.command.workplace.group;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.AllArgsConstructor;
import nts.arc.error.BusinessException;
import nts.arc.i18n.I18NText;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.arc.task.tran.AtomTask;
import nts.arc.time.GeneralDate;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroupRespository;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupName;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupRespository;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplaceResult;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplacement;
import nts.uk.ctx.bs.employee.dom.workplace.group.domainservice.ReplaceWorkplacesService;
import nts.uk.ctx.bs.employee.dom.workplace.master.service.WorkplaceExportService;
import nts.uk.ctx.bs.employee.dom.workplace.master.service.WorkplaceInforParam;
import nts.uk.shr.com.context.AppContexts;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.App.職場グループを削除する
 * <<Command>> 職場グループを更新する
 *
 * @author phongtq
 *
 */
@Stateless
public class UpdateWorkplaceGroupCommandHandler
		extends CommandHandlerWithResult<RegisterWorkplaceGroupCommand, ResWorkplaceGroupResult> {

	@Inject
	private WorkplaceGroupRespository repo;

	@Inject
	private AffWorkplaceGroupRespository affRepo;

	@Inject
	private WorkplaceExportService service;

	@Override
	protected ResWorkplaceGroupResult handle(CommandHandlerContext<RegisterWorkplaceGroupCommand> context) {
		String CID = AppContexts.user().companyId();
		RegisterWorkplaceGroupCommand cmd = context.getCommand();

		if (CollectionUtil.isEmpty(cmd.getLstWKPID())) {
			throw new BusinessException("MsgB_2", I18NText.getText("Com_Workplace"));
		}
		// 1: get(会社ID, 職場グループコード)
		// return Optional<職場グループ>
		Optional<WorkplaceGroup> wpgrp = repo.getById(CID, cmd.getWkpGrID());

		// 2: set(職場グループ名称, 職場グループ種別)
		wpgrp.get().setName(new WorkplaceGroupName(cmd.getWkpGrName()));

		ReplaceWorkplacesService.Require updateRequire = new UpdateWplOfWorkGrpRequireImpl(affRepo);

		// 3: 入れ替える(Require, 職場グループ, List<職場ID>): List<職場グループの職場入替処理結果>
		Map<String, WorkplaceReplaceResult> wplResult = ReplaceWorkplacesService.replaceWorkplace(updateRequire,
				wpgrp.get(), cmd.getLstWKPID());
		List<WorkplaceReplaceResult> resultProcessData = wplResult.entrySet().stream()
				.map(x -> (WorkplaceReplaceResult) x.getValue()).collect(Collectors.toList());

		List<WorkplaceReplaceResultDto> resultData = new ArrayList<>();
		wplResult.forEach((a,b)->{
			resultData.add(new WorkplaceReplaceResultDto(b.getWorkplaceReplacement().value, b.getWorkplaceGroupId().isPresent() ? b.getWorkplaceGroupId().get() : null,a, b.getPersistenceProcess().isPresent() ? b.getPersistenceProcess().get() : null));
		});

		// 4: [No.560]職場IDから職場の情報をすべて取得する
		GeneralDate baseDate = GeneralDate.today();
		List<WorkplaceInforParam> listWorkplaceInfo = service.getWorkplaceInforFromWkpIds(CID, cmd.getLstWKPID(),
				baseDate);

		// 5: 所属職場グループIDリスト＝処理結果リスト : filter $.処理結果 == 別職場に所属
		// map $.所属職場グループID
		List<WorkplaceReplaceResult> lstResultProcess = resultProcessData.stream()
				.filter(x -> x.getWorkplaceReplacement().value == WorkplaceReplacement.BELONGED_ANOTHER.value)
				.collect(Collectors.toList());

		// flow
		// 所属職場グループIDリスト
		List<String> lstWplGrId = lstResultProcess.stream().map(mapper -> mapper.getWorkplaceGroupId().get())
				.collect(Collectors.toList());

		// 6: [所属職場グループIDリスト.isPresent()]:*get(ログイン会社ID, 所属職場グループIDリスト): List<職場グループ>
		List<WorkplaceGroup> lstWplGroups = new ArrayList<>();
		if (!lstWplGrId.isEmpty()) {
			lstWplGroups = repo.getAllById(CID, lstWplGrId);
		}

		List<WorkplaceReplaceResult> lstReplaceAdd = new ArrayList<>();
		resultProcessData.forEach(x -> {
			// 7: not 所属対象がある
			if (x.getWorkplaceReplacement().checkWplReplace() == true) {
				lstReplaceAdd.add(x);
			}
		});

		// List<職場ID, 職場コード, 職場名称>
		List<WorkplaceParam> workplaceParams = listWorkplaceInfo.stream()
				.map(x -> new WorkplaceParam(x.getWorkplaceId(), x.getWorkplaceCode(), x.getWorkplaceName()))
				.collect(Collectors.toList());

		// List<Optional<職場グループコード, 職場グループ名称>>
		List<WorkplaceGroupResult> groupResults = lstWplGroups.stream()
				.map(x -> new WorkplaceGroupResult(x.getId(), x.getCode().v(), x.getName().v()))
				.collect(Collectors.toList());
		boolean checkProcessResult = false;
		if (lstReplaceAdd.size() < 1) {
			return new ResWorkplaceGroupResult(checkProcessResult, workplaceParams, resultData, groupResults, wpgrp.get().getId());
		}

		// 8: 職場グループ所属情報の永続化処理 = 処理結果リスト : filter $.永続化処理.isPresent
		// map $.永続化処理
		List<WorkplaceReplaceResult> resultProcess = wplResult.entrySet().stream()
				.filter(x -> x.getValue().getPersistenceProcess().isPresent())
				.map(x -> (WorkplaceReplaceResult) x.getValue()).collect(Collectors.toList());

		// 9.1: persist
		if(lstReplaceAdd.size() > 0) {
		this.repo.update(wpgrp.get());
		checkProcessResult = true;
		}
		// 9.2: 職場グループ所属情報の永続化処理
		resultProcess.forEach(x -> {
			AtomTask atomTask = x.getPersistenceProcess().get();
			transaction.execute(() -> {
				atomTask.run();
			});
		});

		ResWorkplaceGroupResult groupResult = new ResWorkplaceGroupResult(checkProcessResult, workplaceParams,
				resultData, groupResults, wpgrp.get().getId());

		return groupResult;
	}

	@AllArgsConstructor
	private static class UpdateWplOfWorkGrpRequireImpl implements ReplaceWorkplacesService.Require {

		@Inject
		private AffWorkplaceGroupRespository affRepo;

		@Override
		public Optional<AffWorkplaceGroup> getByWKPID(String WKPID) {
			String CID = AppContexts.user().companyId();
			return affRepo.getByWKPID(CID, WKPID);
		}

		@Override
		public void insert(AffWorkplaceGroup affWorkplaceGroup) {
			affRepo.insert(affWorkplaceGroup);
		}

		@Override
		public List<AffWorkplaceGroup> getByWKPGRPID(String WKPGRPID) {
			String CID = AppContexts.user().companyId();
			return affRepo.getByWKPGRPID(CID, WKPGRPID);
		}

		@Override
		public void deleteByWKPID(String WKPID) {
			String CID = AppContexts.user().companyId();
			affRepo.deleteByWKPID(CID, WKPID);
		}
	}
}
