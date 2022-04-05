package nts.uk.ctx.sys.portal.dom.toppagealarm.service.registeralarmdata;

import java.util.Arrays;
import java.util.Optional;
import org.junit.Test;
import org.junit.runner.RunWith;
import mockit.Expectations;
import mockit.Injectable;
import mockit.Mocked;
import mockit.Verifications;
import mockit.integration.junit4.JMockit;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmClassification;
import nts.uk.ctx.sys.portal.dom.toppagealarm.DisplayAtr;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmData;
import nts.uk.ctx.sys.portal.dom.toppagealarm.service.registeralarmdata.RegisterAlarmDataDs.RegisterAlarmDataRequire;
import nts.uk.shr.com.i18n.TextResource;

@RunWith(JMockit.class)
public class RegisterAlarmDataDsTest {

	@Injectable
	private RegisterAlarmDataRequire require;
	
	@Mocked 
	private TextResource tr;
	
	/**
	 * $トップアラーム.isPresent()
	 * $トップアラーム.既読日時　EMPTY
	 */
	@Test
	public void RegisterAlarmDataDsTest1() {
		
		//given
		ToppageAlarmParam param = RegisterAlarmDataDsHelper.mockParamHealthLife();
		DisplayAtr displayAtr = param.getDisplayEmpClassfication();
		AlarmClassification alarmCls = param.getAlarmClassification();
		
		//[R-1]
		Optional<ToppageAlarmData> checkDomain = RegisterAlarmDataDsHelper.mockToppageAlarmDataReadDateEmpty();
		
		new Expectations() {
			{
				require.get(RegisterAlarmDataDsHelper.CID, 
						RegisterAlarmDataDsHelper.SID, 
						displayAtr.value, 
						alarmCls.value, 
						Optional.of(RegisterAlarmDataDsHelper.PARTTERN_CD),
						Optional.empty());
				result = checkDomain;
			}
		};
		
		//when
		AtomTask result = AtomTask.of(() -> RegisterAlarmDataDs.register(require, RegisterAlarmDataDsHelper.CID, param));
		
		// Before
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 0;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 0;
			}
		};

		// Execute
		result.run();

		// After
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 1;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 0;
			}
		};
	}
	
	/**
	 * $トップアラーム.isPresent()
	 * $トップアラーム.既読日時　>　トップアラームパラメータ.発生日時
	 */
	@Test
	public void RegisterAlarmDataDsTest2() {
		
		//given
		ToppageAlarmParam param = RegisterAlarmDataDsHelper.mockParamHealthLife();
		DisplayAtr displayAtr = param.getDisplayEmpClassfication();
		AlarmClassification alarmCls = param.getAlarmClassification();
		
		//[R-1]
		Optional<ToppageAlarmData> checkDomain = RegisterAlarmDataDsHelper.mockToppageAlarmDataReadDateAfter();
		
		new Expectations() {
			{
				require.get(RegisterAlarmDataDsHelper.CID, RegisterAlarmDataDsHelper.SID, displayAtr.value, alarmCls.value, Optional.of(RegisterAlarmDataDsHelper.PARTTERN_CD), Optional.empty());
				result = checkDomain;
			}
		};
		
		//when
		AtomTask result = AtomTask.of(() -> RegisterAlarmDataDs.register(require, RegisterAlarmDataDsHelper.CID, param));
		
		// Before
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 0;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 0;
			}
		};

		// Execute
		result.run();

		// After
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 0;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 0;
			}
		};
	}
	
	/**
	 * $トップアラーム.isPresent()
	 * $トップアラーム.既読日時　<　トップアラームパラメータ.発生日時
	 */
	@Test
	public void RegisterAlarmDataDsTest3() {
		
		//given
		ToppageAlarmParam param = RegisterAlarmDataDsHelper.mockParamHealthLife();
		DisplayAtr displayAtr = param.getDisplayEmpClassfication();
		AlarmClassification alarmCls = param.getAlarmClassification();
		
		//[R-1]
		Optional<ToppageAlarmData> checkDomain = RegisterAlarmDataDsHelper.mockToppageAlarmDataReadDateBefore();
		
		new Expectations() {
			{
				require.get(RegisterAlarmDataDsHelper.CID, 
						RegisterAlarmDataDsHelper.SID, 
						displayAtr.value, 
						alarmCls.value, 
						Optional.of(RegisterAlarmDataDsHelper.PARTTERN_CD), 
						Optional.empty());
				result = checkDomain;
			}
		};
		
		//when
		AtomTask result = AtomTask.of(() -> RegisterAlarmDataDs.register(require, RegisterAlarmDataDsHelper.CID, param));
		
		// Before
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 0;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 0;
			}
		};

		// Execute
		result.run();

		// After
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 1;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 0;
			}
		};
	}
	
	/**
	 * $トップアラーム.isNotPresent()
	 * アラーム分類 = ヘルス×ライフメッセージ
	 */
	@Test
	public void RegisterAlarmDataDsTest4() {
		
		//given
		ToppageAlarmParam param = RegisterAlarmDataDsHelper.mockParamHealthLife();
		
		//when
		AtomTask result = AtomTask.of(() -> RegisterAlarmDataDs.register(require, RegisterAlarmDataDsHelper.CID, param));
		
		// Before
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 0;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 0;
			}
		};

		// Execute
		result.run();

		// After
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 0;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 1;
			}
		};
	}
	
	/**
	 * $トップアラーム.isNotPresent()
	 * アラーム分類 = アラームリスト
	 * 表示社員区分 = 本人
	 */
	@Test
	public void RegisterAlarmDataDsTest5() {
		
		//given
		ToppageAlarmParam param = RegisterAlarmDataDsHelper.mockParamAlarmListPrincipal();
		String patternName = param.getPatternName().orElse("");
		
		new Expectations() {
			{
				TextResource.localize(RegisterAlarmDataDsHelper.KTG031_37, Arrays.asList(patternName));
				result = RegisterAlarmDataDsHelper.KTG031_37;
			}
		};
		
		//when
		AtomTask result = AtomTask.of(() -> RegisterAlarmDataDs.register(require, RegisterAlarmDataDsHelper.CID, param));
		
		// Before
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 0;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 0;
			}
		};

		// Execute
		result.run();

		// After
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 0;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 1;
			}
		};
	}
	
	/**
	 * $トップアラーム.isNotPresent()
	 * アラーム分類 = アラームリスト
	 * 表示社員区分 = 上長
	 */
	@Test
	public void RegisterAlarmDataDsTest6() {
		
		//given
		ToppageAlarmParam param = RegisterAlarmDataDsHelper.mockParamAlarmListBoss();
		String patternName = param.getPatternName().orElse("");

		new Expectations() {
			{
				TextResource.localize(RegisterAlarmDataDsHelper.KTG031_38, Arrays.asList(patternName));
				result = RegisterAlarmDataDsHelper.KTG031_38;
			}
		};
		
		//when
		AtomTask result = AtomTask.of(() -> RegisterAlarmDataDs.register(require, RegisterAlarmDataDsHelper.CID, param));
		
		// Before
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 0;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 0;
			}
		};

		// Execute
		result.run();

		// After
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 0;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 1;
			}
		};
	}
	
	/**
	 * $トップアラーム.isNotPresent()
	 * アラーム分類 = 更新処理自動実行業務エラー
	 */
	@Test
	public void RegisterAlarmDataDsTest7() {
		
		//given
		ToppageAlarmParam param = RegisterAlarmDataDsHelper.mockParamAlarmListBusinessErr();
		
		new Expectations() {
			{
				require.getUrl(RegisterAlarmDataDsHelper.CID, 
						RegisterAlarmDataDsHelper.KINJIRO, 
						RegisterAlarmDataDsHelper.STANDARD, 
						RegisterAlarmDataDsHelper.KBT002, 
						RegisterAlarmDataDsHelper.F);
				result = Optional.of(RegisterAlarmDataDsHelper.URL);
			}
			{
				TextResource.localize(RegisterAlarmDataDsHelper.KTG031_39);
				result = RegisterAlarmDataDsHelper.KTG031_39;
			}
		};
		
		//when
		AtomTask result = AtomTask.of(() -> RegisterAlarmDataDs.register(require, RegisterAlarmDataDsHelper.CID, param));
		
		// Before
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 0;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 0;
			}
		};

		// Execute
		result.run();

		// After
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 0;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 1;
			}
		};
	}
	
	/**
	 * $トップアラーム.isNotPresent()
	 * アラーム分類 = アラームリスト
	 * 表示社員区分 = 担当者
	 */
	@Test
	public void RegisterAlarmDataDsTest8() {
		
		//given
		ToppageAlarmParam param = RegisterAlarmDataDsHelper.mockParamAlarmListPic();
		
		new Expectations() {
			{
				TextResource.localize(RegisterAlarmDataDsHelper.KTG031_40);
				result = RegisterAlarmDataDsHelper.KTG031_40;
			}
		};
		
		//when
		AtomTask result = AtomTask.of(() -> RegisterAlarmDataDs.register(require, RegisterAlarmDataDsHelper.CID, param));
		
		// Before
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 0;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 0;
			}
		};

		// Execute
		result.run();

		// After
		new Verifications() {
			{
				require.update((ToppageAlarmData) any);
				times = 0;
			}
			{
				require.insert((ToppageAlarmData) any);
				times = 1;
			}
		};
	}
}
