package nts.uk.ctx.sys.portal.dom.generalsearch.service;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;

import lombok.val;
import mockit.Expectations;
import mockit.Injectable;
import mockit.integration.junit4.JMockit;
import nts.arc.testing.assertion.NtsAssert;

/**
 * The Class GeneralSearchHistoryServiceTest.
 * Test DomainService 汎用検索の履歴
 */
@RunWith(JMockit.class)
public class GeneralSearchHistoryServiceTest {
	@Injectable
	private GeneralSearchHistoryService.Require require;
	
	@Test
	public void testCheckRoleSearchManual1() {
		String forCompanyAdmin = "forCompanyAdmin";
		String forSystemAdmin = "forSystemAdmin";
		val domainService = new GeneralSearchHistoryService();
		val result = (boolean)NtsAssert.Invoke.privateMethod
				(
				domainService, 
				"checkRoleSearchManual", 
				require,
				forCompanyAdmin,
				forSystemAdmin
				);
		assertTrue(result);
	}

	@Test
	public void testCheckRoleSearchManual2() {
		String forCompanyAdmin = null;
		String forSystemAdmin = "forSystemAdmin";
		val domainService = new GeneralSearchHistoryService();
		val result = (boolean)NtsAssert.Invoke.privateMethod
				(
						domainService, 
						"checkRoleSearchManual", 
						require,
						forCompanyAdmin,
						forSystemAdmin
						);
		assertTrue(result);
	}

	@Test
	public void testCheckRoleSearchManual3() {
		new Expectations() {
			{
				require.getLoginResponsible().isPersonIncharge();
				result = false;
			}
		};
		val domainService = new GeneralSearchHistoryService();
		val result2 = (boolean)NtsAssert.Invoke.privateMethod
				(
						domainService, 
						"checkRoleSearchManual", 
						require,
						null,
						null
						);
		assertFalse(result2);
	}

	@Test
	public void testCheckRoleSearchManual4() {
		String forCompanyAdmin = "forCompanyAdmin";
		String forSystemAdmin = null;
		val domainService = new GeneralSearchHistoryService();
		val result = (boolean)NtsAssert.Invoke.privateMethod
				(
						domainService, 
						"checkRoleSearchManual", 
						require,
						forCompanyAdmin,
						forSystemAdmin
						);
		assertTrue(result);
	}
	
	@Test
	public void testCheckRoleSearchManual5() {
		new Expectations() {
			{
				require.getLoginResponsible().isPersonIncharge();
				result = true;
			}
		};
		val domainService = new GeneralSearchHistoryService();
		val result = (boolean)NtsAssert.Invoke.privateMethod
				(
						domainService, 
						"checkRoleSearchManual", 
						require,
						null,
						null
						);
		assertTrue(result);
	}
}
