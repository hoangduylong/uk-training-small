package nts.uk.ctx.sys.portal.dom.toppagealarm.service.updatealarmdata;
import java.util.Collections;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;

import mockit.Expectations;
import mockit.Injectable;
import mockit.Verifications;
import mockit.integration.junit4.JMockit;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmData;
import nts.uk.ctx.sys.portal.dom.toppagealarm.service.updatealarmdata.UpdateAlarmDataDs.UpdateAlarmDataRequire;

@RunWith(JMockit.class)
public class UpdateAlarmDataDsTest {

	@Injectable
	private UpdateAlarmDataRequire require;
	
	/**
	 * [表示社員区分　!＝　上長]
	 * List<トップアラーム> NOT EMPTY
	 */
	@Test
	public void updateAlarmDataDsTest1() {
		
		//given	
		List<ToppageAlarmData> toppageAlarmDatas = UpdateAlarmDataDsHelper.mockR1(); 
		
		new Expectations() {
			{
				require.getAlarmList(UpdateAlarmDataDsHelper.CID, 
						UpdateAlarmDataDsHelper.SIDS, 
						UpdateAlarmDataDsHelper.PRINCIPAL, 
						UpdateAlarmDataDsHelper.ALARM_LIST_CD
						);
				result = toppageAlarmDatas;
			}
		};
		
		//when
		AtomTask result = UpdateAlarmDataDs.create(require, 
				UpdateAlarmDataDsHelper.CID,  
				UpdateAlarmDataDsHelper.SIDS, 
				UpdateAlarmDataDsHelper.PATTER_CD,
				UpdateAlarmDataDsHelper.NO_ERR_SIDS,
				UpdateAlarmDataDsHelper.PRINCIPAL.value
				);
		 
		// Before
		new Verifications() {{
			require.updateAll(toppageAlarmDatas);
			times = 0;
		}};

		// Execute
		result.run();

		// After
		new Verifications() {{
			require.updateAll(toppageAlarmDatas);
			times = 1;
		}};
	}
	
	/**
	 * [表示社員区分　!＝　上長]
	 * List<トップアラーム> EMPTY
	 */
	@Test
	public void updateAlarmDataDsTest2() {
		
		//given	
		List<ToppageAlarmData> toppageAlarmDatas = Collections.emptyList(); 
			
		//when
		AtomTask result = UpdateAlarmDataDs.create(require, 
				UpdateAlarmDataDsHelper.CID,  
				UpdateAlarmDataDsHelper.SIDS, 
				UpdateAlarmDataDsHelper.PATTER_CD,
				UpdateAlarmDataDsHelper.NO_ERR_SIDS,
				UpdateAlarmDataDsHelper.PRINCIPAL.value
				);
		 
		// Before
		new Verifications() {{
			require.updateAll(toppageAlarmDatas);
			times = 0;
		}};

		// Execute
		result.run();

		// After
		new Verifications() {{
			require.updateAll(toppageAlarmDatas);
			times = 1;
		}};
	}
	
	/**
	 * [表示社員区分　＝　上長]
	 * List<トップアラーム> EMPTY
	 */
	@Test
	public void updateAlarmDataDsTest3() {
		
		//given	
		List<ToppageAlarmData> toppageAlarmDatas = Collections.emptyList(); 
			
		//when
		AtomTask result = UpdateAlarmDataDs.create(require, 
				UpdateAlarmDataDsHelper.CID,  
				UpdateAlarmDataDsHelper.SIDS, 
				UpdateAlarmDataDsHelper.PATTER_CD,
				UpdateAlarmDataDsHelper.NO_ERR_SIDS,
				UpdateAlarmDataDsHelper.SUPERIOR.value
				);
		 
		// Before
		new Verifications() {{
			require.updateAll(toppageAlarmDatas);
			times = 0;
		}};

		// Execute
		result.run();

		// After
		new Verifications() {{
			require.updateAll(toppageAlarmDatas);
			times = 1;
		}};
	}
	
	/**
	 * [表示社員区分　＝　上長]
	 * List<トップアラーム> NOT EMPTY
	 */
	@Test
	public void updateAlarmDataDsTest4() {
		
		//given	
		List<ToppageAlarmData> toppageAlarmDatas = UpdateAlarmDataDsHelper.mockR1(); 
		
		new Expectations() {
			{
				require.getAlarmList(UpdateAlarmDataDsHelper.CID, 
						UpdateAlarmDataDsHelper.SIDS, 
						UpdateAlarmDataDsHelper.SUPERIOR, 
						UpdateAlarmDataDsHelper.ALARM_LIST_CD
						);
				result = toppageAlarmDatas;
			}
		};
		List<String> noErrSids = UpdateAlarmDataDsHelper.NO_ERR_SIDS;
		noErrSids.addAll(UpdateAlarmDataDsHelper.SIDS);
		
		//when
		AtomTask result = UpdateAlarmDataDs.create(require, 
				UpdateAlarmDataDsHelper.CID,  
				UpdateAlarmDataDsHelper.SIDS, 
				UpdateAlarmDataDsHelper.PATTER_CD,
				noErrSids,
				UpdateAlarmDataDsHelper.SUPERIOR.value
				);
		 
		// Before
		new Verifications() {{
			require.updateAll(toppageAlarmDatas);
			times = 0;
		}};

		// Execute
		result.run();

		// After
		new Verifications() {{
			require.updateAll(toppageAlarmDatas);
			times = 1;
		}};
	}
	
	/**
	 * [表示社員区分　＝　上長]
	 * List<トップアラーム> EMPTY
	 */
	@Test
	public void updateAlarmDataDsTest5() {
		
		//given	
		List<ToppageAlarmData> toppageAlarmDatas = UpdateAlarmDataDsHelper.mockR1(); 
		
		new Expectations() {
			{
				require.getAlarmList(UpdateAlarmDataDsHelper.CID, 
						UpdateAlarmDataDsHelper.SIDS, 
						UpdateAlarmDataDsHelper.SUPERIOR, 
						UpdateAlarmDataDsHelper.ALARM_LIST_CD
						);
				result = toppageAlarmDatas;
			}
		};
		List<String> noErrSids = UpdateAlarmDataDsHelper.NO_ERR_SIDS;
		noErrSids.addAll(UpdateAlarmDataDsHelper.SIDS.subList(0, 1));
		
		//when
		AtomTask result = UpdateAlarmDataDs.create(require, 
				UpdateAlarmDataDsHelper.CID,  
				UpdateAlarmDataDsHelper.SIDS, 
				UpdateAlarmDataDsHelper.PATTER_CD,
				noErrSids,
				UpdateAlarmDataDsHelper.SUPERIOR.value
				);
		 
		// Before
		new Verifications() {{
			require.updateAll(toppageAlarmDatas);
			times = 0;
		}};

		// Execute
		result.run();

		// After
		new Verifications() {{
			require.updateAll(toppageAlarmDatas);
			times = 1;
		}};
	}
}
