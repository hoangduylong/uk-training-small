package nts.uk.ctx.bs.employee.dom.workplace.group.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;

import mockit.integration.junit4.JMockit;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplacement;

@RunWith(JMockit.class)
public class WorkplaceReplacementTest {
	@Test
	public void testCheckWplReplaceTrue() {
		WorkplaceReplacement add = WorkplaceReplacement.ADD;
		assertThat(add.checkWplReplace() == true).isTrue();
	}
	
	@Test
	public void testCheckWplReplaceTrue2() {
		WorkplaceReplacement alreadyBelonged = WorkplaceReplacement.ALREADY_BELONGED;
		assertThat(alreadyBelonged.checkWplReplace() == true).isTrue();
	}
	
	@Test
	public void testCheckWplReplaceFalse() {
		WorkplaceReplacement delete = WorkplaceReplacement.DELETE;
		assertThat(delete.checkWplReplace() == true).isFalse();
	}
	
	@Test
	public void testCheckWplReplaceFalse2() {
		WorkplaceReplacement belongedAnother = WorkplaceReplacement.BELONGED_ANOTHER;
		assertThat(belongedAnother.checkWplReplace() == true).isFalse();
	}
}
