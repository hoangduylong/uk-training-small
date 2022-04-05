package nts.uk.ctx.sys.portal.dom.toppagealarm.service.createalarmdata;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.junit.Test;
import org.junit.runner.RunWith;
import mockit.Injectable;
import mockit.Mocked;
import mockit.Verifications;
import mockit.integration.junit4.JMockit;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmClassification;
import nts.uk.ctx.sys.portal.dom.toppagealarm.service.registeralarmdata.RegisterAlarmDataDs;
import nts.uk.ctx.sys.portal.dom.toppagealarm.service.registeralarmdata.ToppageAlarmParam;
import nts.uk.ctx.sys.portal.dom.toppagealarm.service.registeralarmdata.RegisterAlarmDataDs.RegisterAlarmDataRequire;
import nts.uk.ctx.sys.portal.dom.toppagealarm.service.updatealarmdata.UpdateAlarmDataDs;
import nts.uk.ctx.sys.portal.dom.toppagealarm.service.updatealarmdata.UpdateAlarmDataDs.UpdateAlarmDataRequire;
import nts.uk.ctx.sys.portal.dom.toppagealarm.service.updateautorunalarm.UpdateAutoRunAlarmDs;
import nts.uk.ctx.sys.portal.dom.toppagealarm.service.updateautorunalarm.UpdateAutoRunAlarmDs.UpdateAutoRunAlarmRequire;
import nts.uk.shr.com.i18n.TextResource;

@RunWith(JMockit.class)
public class CreateAlarmDataDsTest {

	@Injectable
	private UpdateAutoRunAlarmRequire rq1;

	@Injectable
	private UpdateAlarmDataRequire rq2;

	@Injectable
	private RegisterAlarmDataRequire rq3;
	
	@Mocked 
	private TextResource tr;

	@Mocked 
	private UpdateAutoRunAlarmDs updateAutoRunAlarmDs;
	
	@Mocked 
	private UpdateAlarmDataDs updateAlarmDataDs;
	
	@Mocked 
	private RegisterAlarmDataDs registerAlarmDataDs;
	
	/*
	 * Optional<削除の情報> NOT EMPTY
	 * アラーム分類 = 更新処理自動実行業務エラー
	 */
	@Test
	public void CreateAlarmDataDsTest1() {
		// give
		List<ToppageAlarmParam> alarmInfos = CreateAlarmDataDsHelper.mockToppageAlarmParams();
		Optional<DeleleteInfo> delInfo = CreateAlarmDataDsHelper.mockDeleleteInfoBusinessErr();

		// when
		AtomTask result = AtomTask.of(() -> CreateAlarmDataDs.create(rq1, rq2, rq3, CreateAlarmDataDsHelper.CID, alarmInfos, delInfo));
		
		// Before
		new Verifications() {
			{
				UpdateAutoRunAlarmDs.create(rq1, CreateAlarmDataDsHelper.CID, delInfo.get().getAlarmClassification(), delInfo.get().getSids());
				times = 0;
			}
			{
				UpdateAlarmDataDs.create(rq2, CreateAlarmDataDsHelper.CID, delInfo.get().getSids(), delInfo.get().getAlarmListParttenCode().get(), new ArrayList<>(), delInfo.get().getDisplayEmpClassfication().value);
				times = 0;
			}
			{
				RegisterAlarmDataDs.register(rq3, CreateAlarmDataDsHelper.CID, (ToppageAlarmParam) any);
				times = 0;
			}
		};

		// Execute
		result.run();

		// After
		new Verifications() {
			{
				UpdateAutoRunAlarmDs.create(rq1, CreateAlarmDataDsHelper.CID, delInfo.get().getAlarmClassification(), delInfo.get().getSids());
				times = 1;
			}
			{
				UpdateAlarmDataDs.create(rq2, CreateAlarmDataDsHelper.CID, delInfo.get().getSids(), delInfo.get().getAlarmListParttenCode().get(), new ArrayList<>(), delInfo.get().getDisplayEmpClassfication().value);
				times = 0;
			}
			{
				RegisterAlarmDataDs.register(rq3, CreateAlarmDataDsHelper.CID, (ToppageAlarmParam) any);
				times = alarmInfos.size();
			}
		};
		
	}
	
	/*
	 * Optional<削除の情報> NOT EMPTY
	 * アラーム分類 = 更新処理自動実行動作異常
	 */
	@Test
	public void CreateAlarmDataDsTest2() {
		// give
		List<ToppageAlarmParam> alarmInfos = CreateAlarmDataDsHelper.mockToppageAlarmParams();
		Optional<DeleleteInfo> delInfo = CreateAlarmDataDsHelper.mockDeleleteInfoOperationErr();

		// when
		AtomTask result = AtomTask.of(() -> CreateAlarmDataDs.create(rq1, rq2, rq3, CreateAlarmDataDsHelper.CID, alarmInfos, delInfo));
		
		// Before
		new Verifications() {
			{
				UpdateAutoRunAlarmDs.create(rq1, CreateAlarmDataDsHelper.CID, delInfo.get().getAlarmClassification(), delInfo.get().getSids());
				times = 0;
			}
			{
				UpdateAlarmDataDs.create(rq2, CreateAlarmDataDsHelper.CID, delInfo.get().getSids(), delInfo.get().getAlarmListParttenCode().get(), new ArrayList<>(), delInfo.get().getDisplayEmpClassfication().value);
				times = 0;
			}
			{
				RegisterAlarmDataDs.register(rq3, CreateAlarmDataDsHelper.CID, (ToppageAlarmParam) any);
				times = 0;
			}
		};

		// Execute
		result.run();

		// After
		new Verifications() {
			{
				UpdateAutoRunAlarmDs.create(rq1, CreateAlarmDataDsHelper.CID, delInfo.get().getAlarmClassification(), delInfo.get().getSids());
				times = 1;
			}
			{
				UpdateAlarmDataDs.create(rq2, CreateAlarmDataDsHelper.CID, delInfo.get().getSids(), delInfo.get().getAlarmListParttenCode().get(), new ArrayList<>(), delInfo.get().getDisplayEmpClassfication().value);
				times = 0;
			}
			{
				RegisterAlarmDataDs.register(rq3, CreateAlarmDataDsHelper.CID, (ToppageAlarmParam) any);
				times = alarmInfos.size();
			}
		};
	}
	
	/*
	 * Optional<削除の情報> NOT EMPTY
	 * アラーム分類 = アラームリスト
	 */
	@Test
	public void CreateAlarmDataDsTest3() {
		// give
		List<ToppageAlarmParam> alarmInfos = CreateAlarmDataDsHelper.mockToppageAlarmParams();
		Optional<DeleleteInfo> delInfo = CreateAlarmDataDsHelper.mockDeleleteInfoAlarmList();

		// when
		AtomTask result = AtomTask.of(() -> CreateAlarmDataDs.create(rq1, rq2, rq3, CreateAlarmDataDsHelper.CID, alarmInfos, delInfo));
		
		// Before
		new Verifications() {
			{
				UpdateAutoRunAlarmDs.create(rq1, CreateAlarmDataDsHelper.CID, delInfo.get().getAlarmClassification(), delInfo.get().getSids());
				times = 0;
			}
			{
				UpdateAlarmDataDs.create(rq2, CreateAlarmDataDsHelper.CID, delInfo.get().getSids(), delInfo.get().getAlarmListParttenCode().get(), new ArrayList<>(), delInfo.get().getDisplayEmpClassfication().value);
				times = 0;
			}
			{
				RegisterAlarmDataDs.register(rq3, CreateAlarmDataDsHelper.CID, (ToppageAlarmParam) any);
				times = 0;
			}
		};

		// Execute
		result.run();

		// After
		new Verifications() {
			{
				UpdateAutoRunAlarmDs.create(rq1, CreateAlarmDataDsHelper.CID, delInfo.get().getAlarmClassification(), delInfo.get().getSids());
				times = 0;
			}
			{
				UpdateAlarmDataDs.create(rq2, CreateAlarmDataDsHelper.CID, delInfo.get().getSids(), delInfo.get().getAlarmListParttenCode().get(), new ArrayList<>(), delInfo.get().getDisplayEmpClassfication().value);
				times = 1;
			}
			{
				RegisterAlarmDataDs.register(rq3, CreateAlarmDataDsHelper.CID, (ToppageAlarmParam) any);
				times = alarmInfos.size();
			}
		};
	}
	
	/*
	 * Optional<削除の情報>  EMPTY
	 */
	@Test
	public void CreateAlarmDataDsTest4() {
		// give
		List<ToppageAlarmParam> alarmInfos = CreateAlarmDataDsHelper.mockToppageAlarmParams();
		Optional<DeleleteInfo> delInfo = Optional.empty();

		// when
		AtomTask result = AtomTask.of(() -> CreateAlarmDataDs.create(rq1, rq2, rq3, CreateAlarmDataDsHelper.CID, alarmInfos, delInfo));
		
		// Before
		new Verifications() {
			{
				UpdateAutoRunAlarmDs.create(rq1, CreateAlarmDataDsHelper.CID, (AlarmClassification) any, CreateAlarmDataDsHelper.SIDS);
				times = 0;
			}
			{
				UpdateAlarmDataDs.create(rq2, CreateAlarmDataDsHelper.CID, CreateAlarmDataDsHelper.SIDS, (String) any, new ArrayList<>(), (Integer) any);
				times = 0;
			}
			{
				RegisterAlarmDataDs.register(rq3, CreateAlarmDataDsHelper.CID, (ToppageAlarmParam) any);
				times = 0;
			}
		};

		// Execute
		result.run();

		// After
		new Verifications() {
			{
				UpdateAutoRunAlarmDs.create(rq1, CreateAlarmDataDsHelper.CID, (AlarmClassification) any, CreateAlarmDataDsHelper.SIDS);
				times = 0;
			}
			{
				UpdateAlarmDataDs.create(rq2, CreateAlarmDataDsHelper.CID, CreateAlarmDataDsHelper.SIDS, (String) any, new ArrayList<>(), (Integer) any);
				times = 0;
			}
			{
				RegisterAlarmDataDs.register(rq3, CreateAlarmDataDsHelper.CID, (ToppageAlarmParam) any);
				times = alarmInfos.size();
			}
		};
	}
	
	/*
	 * List<アラーム情報>  EMPTY
	 */
	@Test
	public void CreateAlarmDataDsTest5() {
		// give
		List<ToppageAlarmParam> alarmInfos = Collections.emptyList();
		Optional<DeleleteInfo> delInfo = Optional.empty();

		// when
		AtomTask result = AtomTask.of(() -> CreateAlarmDataDs.create(rq1, rq2, rq3, CreateAlarmDataDsHelper.CID, alarmInfos, delInfo));
		
		// Before
		new Verifications() {
			{
				UpdateAutoRunAlarmDs.create(rq1, CreateAlarmDataDsHelper.CID, (AlarmClassification) any, CreateAlarmDataDsHelper.SIDS);
				times = 0;
			}
			{
				UpdateAlarmDataDs.create(rq2, CreateAlarmDataDsHelper.CID, CreateAlarmDataDsHelper.SIDS, (String) any, new ArrayList<>(), (Integer) any);
				times = 0;
			}
			{
				RegisterAlarmDataDs.register(rq3, CreateAlarmDataDsHelper.CID, (ToppageAlarmParam) any);
				times = 0;
			}
		};

		// Execute
		result.run();

		// After
		new Verifications() {
			{
				UpdateAutoRunAlarmDs.create(rq1, CreateAlarmDataDsHelper.CID, (AlarmClassification) any, CreateAlarmDataDsHelper.SIDS);
				times = 0;
			}
			{
				UpdateAlarmDataDs.create(rq2, CreateAlarmDataDsHelper.CID, CreateAlarmDataDsHelper.SIDS, (String) any, new ArrayList<>(), (Integer) any);
				times = 0;
			}
			{
				RegisterAlarmDataDs.register(rq3, CreateAlarmDataDsHelper.CID, (ToppageAlarmParam) any);
				times = 0;
			}
		};
	}
}
