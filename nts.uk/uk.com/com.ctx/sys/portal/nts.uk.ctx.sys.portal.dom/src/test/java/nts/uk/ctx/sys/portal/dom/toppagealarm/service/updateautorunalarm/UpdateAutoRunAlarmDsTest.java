package nts.uk.ctx.sys.portal.dom.toppagealarm.service.updateautorunalarm;

import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import mockit.Expectations;
import mockit.Injectable;
import mockit.Verifications;
import mockit.integration.junit4.JMockit;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmData;
import nts.uk.ctx.sys.portal.dom.toppagealarm.service.updateautorunalarm.UpdateAutoRunAlarmDs.UpdateAutoRunAlarmRequire;

@RunWith(JMockit.class) 
public class UpdateAutoRunAlarmDsTest {

	@Injectable
	UpdateAutoRunAlarmRequire require;
	
	@Test
	public void UpdateAutoRunAlarmDsTest1() {
		// given
		List<ToppageAlarmData> autoRunAlarm = UpdateAutoRunAlarmDsHelper.mockR1();

		new Expectations() {
			{
				require.getAutoRunAlarm(UpdateAutoRunAlarmDsHelper.CID, UpdateAutoRunAlarmDsHelper.ALARM_CLS, UpdateAutoRunAlarmDsHelper.SIDS);
				result = autoRunAlarm;
			}
		};

		// when
		AtomTask result = UpdateAutoRunAlarmDs.create(require, UpdateAutoRunAlarmDsHelper.CID, UpdateAutoRunAlarmDsHelper.ALARM_CLS, UpdateAutoRunAlarmDsHelper.SIDS);

		// Before
		new Verifications() {
			{
				require.updateAll(autoRunAlarm);
				times = 0;
			}
		};

		// Execute
		result.run();

		// After
		new Verifications() {
			{
				require.updateAll(autoRunAlarm);
				times = 1;
			}
		};
	}
}
