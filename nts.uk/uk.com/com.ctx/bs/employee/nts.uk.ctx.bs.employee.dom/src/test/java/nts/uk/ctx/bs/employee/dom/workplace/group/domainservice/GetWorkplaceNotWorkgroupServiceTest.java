package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import mockit.Expectations;
import mockit.Injectable;
import mockit.integration.junit4.JMockit;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.domainservice.GetWorkplaceNotWorkgroupService.Require;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceInformation;
/**
 * 
 * @author phongtq
 *
 */

@RunWith(JMockit.class)
public class GetWorkplaceNotWorkgroupServiceTest {
	@Injectable
	private Require require;
	
	String wKPID = "000000000000000000000000000000000011";
	String wKPGRPID = "00000000000001";
	GeneralDate baseDate = GeneralDate.today();
	@Test
	public void get_empty() {
		List<WorkplaceInformation> lstInfoImports = Collections.emptyList();
		new Expectations() {
			{
				require.getAllActiveWorkplace(baseDate);// dummy
				result = lstInfoImports;
			}
		};
		
		List<WorkplaceInformation> imports = GetWorkplaceNotWorkgroupService.getWorkplace(require, baseDate);
		assertThat(imports.isEmpty()).isTrue();
	}
	
	@Test
	public void get_success() {
		List<WorkplaceInformation> lstInfoImports = DomainServiceHelper.getLstWpII();
		new Expectations() {
			{
				require.getAllActiveWorkplace(baseDate);// dummy
				result = lstInfoImports;
				
				require.getAll();// dummy
			}
		};
		List<WorkplaceInformation> importss = GetWorkplaceNotWorkgroupService.getWorkplace(require, baseDate);
		Assert.assertEquals(lstInfoImports, importss);
	}
	
	@Test
	public void get_empty_2() {
		List<WorkplaceInformation> lstInfoImports = Arrays.asList(
				new WorkplaceInformation("dummy", true, "dummy", "000000000000000000000000000000000012", "dummy", "dummy", "dummy", "dummy", "dummy", "dummy"),
				new WorkplaceInformation("dummy", true, "dummy", "000000000000000000000000000000000013", "dummy", "dummy", "dummy", "dummy", "dummy", "dummy"),
				new WorkplaceInformation("dummy", true, "dummy", "000000000000000000000000000000000014", "dummy", "dummy", "dummy", "dummy", "dummy", "dummy"),
				new WorkplaceInformation("dummy", true, "dummy", "000000000000000000000000000000000015", "dummy", "dummy", "dummy", "dummy", "dummy", "dummy"));
		new Expectations() {
			{
				require.getAllActiveWorkplace(baseDate);// dummy
				result = lstInfoImports;
			}
		};
		
		List<AffWorkplaceGroup> workplaceGroup = Arrays.asList(
				new AffWorkplaceGroup("00000000000006", "000000000000000000000000000000000015"),
				new AffWorkplaceGroup("00000000000007", "000000000000000000000000000000000012"),
				new AffWorkplaceGroup("00000000000008", "000000000000000000000000000000000013"),
				new AffWorkplaceGroup("00000000000009", "000000000000000000000000000000000014"));
		new Expectations() {
			{
				require.getAll();// dummy
				result = workplaceGroup;
			}
		};
		List<WorkplaceInformation> importss = GetWorkplaceNotWorkgroupService.getWorkplace(require, baseDate);
		assertThat(importss.isEmpty()).isTrue();
	}
}
