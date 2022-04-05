package nts.uk.ctx.bs.employee.app.command.workplace.group;

import java.util.ArrayList;
import java.util.List;
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
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupRespository;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplaceResult;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplacement;
import nts.uk.ctx.bs.employee.dom.workplace.group.domainservice.AddWplOfWorkGrpService;
import nts.uk.ctx.bs.employee.dom.workplace.master.service.WorkplaceExportService;
import nts.uk.ctx.bs.employee.dom.workplace.master.service.WorkplaceInforParam;
import nts.uk.shr.com.context.AppContexts;
/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.App.職場グループを登録する
 * <<Command>> 職場グループを登録する
 * @author phongtq
 *
 */
@Stateless
public class RegisterWorkplaceGroupCommandHandler extends CommandHandlerWithResult<RegisterWorkplaceGroupCommand, ResWorkplaceGroupResult>{

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

		// check lstWKPID (đã kiểm tra dưới UI nhưng check ở server cho chắc chắn)
		if (CollectionUtil.isEmpty(cmd.getLstWKPID())) {
			throw new BusinessException("MsgB_2", I18NText.getText("Com_Workplace"));
		}

		// 1: get(会社ID, 職場グループコード)
		// return Optional<職場グループ>
		Optional<WorkplaceGroup> wpgrp = repo.getByCode(CID, cmd.getWkpGrCD());

		// 2: 職場グループ.isPresent()
		if (wpgrp.isPresent())
			throw new BusinessException("Msg_3");

		// 3: 職場グループを作成する([mapping]): 職場グループ
		WorkplaceGroup group = cmd.toDomain(CID);

		AddWplOfWorkGrpService.Require addRequire = new AddWplOfWorkGrpRequireImpl(affRepo);
		List<WorkplaceReplaceResult> wplResult = new ArrayList<>();

		// 4: 処理結果リスト = 追加する(Require, 職場グループ, 職場ID):職場グループの職場入替処理結果
		// loop： 職場ID in 職場IDリスト
		List<WorkplaceReplaceResultDto> resultProcessData = new ArrayList<>();
		cmd.getLstWKPID().forEach(x->{
			// DS: 職場グループに所属する職場を追加する
			// 4.1
			WorkplaceReplaceResult result = AddWplOfWorkGrpService.addWorkplace(addRequire, group, x);
			resultProcessData.add(WorkplaceReplaceResultDto.toDtoWithId(result.getWorkplaceReplacement().value,
					result.getWorkplaceGroupId().isPresent() ? result.getWorkplaceGroupId().get() : null,
							x,
							result.getPersistenceProcess().isPresent() ? result.getPersistenceProcess().get() : null));
			wplResult.add(result);
		});

		// 5: [No.560]職場IDから職場の情報をすべて取得する
		GeneralDate baseDate = GeneralDate.today();
		List<WorkplaceInforParam> listWorkplaceInfo = service.getWorkplaceInforFromWkpIds(CID, cmd.getLstWKPID(), baseDate);

		// 6: 所属職場グループIDリスト＝処理結果リスト : filter $.処理結果 == 別職場に所属
		// map $.所属職場グループID
		List<WorkplaceReplaceResult> lstResultProcess = wplResult.stream().filter(x->x.getWorkplaceReplacement().value == WorkplaceReplacement.BELONGED_ANOTHER.value).collect(Collectors.toList());

		// flow
		// 所属職場グループIDリスト
		List<String> lstWplGrId = lstResultProcess.stream().map(mapper -> mapper.getWorkplaceGroupId().get())
				.collect(Collectors.toList());

		// 7: [所属職場グループIDリスト.isPresent()]:*get(ログイン会社ID, 所属職場グループIDリスト): List<職場グループ>
		List<WorkplaceGroup> lstWplGroups = new ArrayList<>();
		if (!lstWplGrId.isEmpty()) {
			lstWplGroups = repo.getAllById(CID, lstWplGrId);
		}

		List<WorkplaceReplaceResult> lstReplaceAdd = new ArrayList<>();
		wplResult.forEach(x -> {
			// 8: not 所属対象がある
			if (x.getWorkplaceReplacement().checkWplReplace() == true) {
				lstReplaceAdd.add(x);
			}
		});

		// List<職場ID, 職場コード, 職場名称>
		List<WorkplaceParam> workplaceParams = listWorkplaceInfo.stream()
				.map(x -> new WorkplaceParam(x.getWorkplaceId(), x.getWorkplaceCode(), x.getWorkplaceName()))
				.collect(Collectors.toList());

		// List<Optional<職場グループコード, 職場グループ名称>>
		List<WorkplaceGroupResult> groupResults = lstWplGroups.stream().map(
				x -> new WorkplaceGroupResult(x.getId(), x.getCode().v(), x.getName().v()))
				.collect(Collectors.toList());

		boolean checkProcessResult = false;
		if(lstReplaceAdd.size() < 1) {
			return new ResWorkplaceGroupResult(checkProcessResult, workplaceParams, resultProcessData, groupResults, group.getId());
		}

		// 9: 職場グループ所属情報の永続化処理 = 処理結果リスト : filter $.永続化処理.isPresent
		// map $.永続化処理
		List<WorkplaceReplaceResult> resultProcess = wplResult.stream().filter(x->x.getPersistenceProcess().isPresent()).collect(Collectors.toList());

		// 10.1: persits
		if(lstReplaceAdd.size() > 0) {
		repo.insert(group);
		checkProcessResult = true;
		}
		// 10.2: 職場グループ所属情報の永続化処理
		resultProcess.forEach(x->{
			AtomTask atomTask = x.getPersistenceProcess().get();
			transaction.execute(() -> {
				atomTask.run();
			});
		});

		ResWorkplaceGroupResult groupResult = new ResWorkplaceGroupResult(checkProcessResult, workplaceParams, resultProcessData, groupResults, group.getId());

		return groupResult;
	}

	@AllArgsConstructor
	private static class AddWplOfWorkGrpRequireImpl implements AddWplOfWorkGrpService.Require {

		@Inject
		private AffWorkplaceGroupRespository affRepo;

		// get ( 会社ID, 職場ID )
		@Override
		public Optional<AffWorkplaceGroup> getByWKPID(String WKPID) {
			String CID = AppContexts.user().companyId();
			return affRepo.getByWKPID(CID, WKPID);
		}

		// insert ( 職場グループ所属情報 )
		@Override
		public void insert(AffWorkplaceGroup affWorkplaceGroup) {
			affRepo.insert(affWorkplaceGroup);
		}

	}
}
