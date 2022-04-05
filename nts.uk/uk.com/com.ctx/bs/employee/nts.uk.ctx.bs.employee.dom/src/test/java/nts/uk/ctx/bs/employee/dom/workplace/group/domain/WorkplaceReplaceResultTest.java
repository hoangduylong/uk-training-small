package nts.uk.ctx.bs.employee.dom.workplace.group.domain;

import static org.assertj.core.api.Assertions.*;

import org.junit.Test;
import org.junit.runner.RunWith;

import mockit.integration.junit4.JMockit;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplaceResult;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplacement;
/**
 *
 * @author phongtq
 *
 */
@RunWith(JMockit.class)
public class WorkplaceReplaceResultTest {
	AtomTask atomTask =  AtomTask.of(() -> {});

	@Test
	public void testAdd() {
		WorkplaceReplaceResult workplaceReplaceResult = WorkplaceReplaceResult.add(atomTask);
		assertThat(workplaceReplaceResult.getWorkplaceReplacement().name().equals(WorkplaceReplacement.ADD.name())).isTrue();
		assertThat(workplaceReplaceResult.getPersistenceProcess().get().equals(atomTask)).isTrue();
	}

	@Test
	public void testDelete () {
		WorkplaceReplaceResult workplaceReplaceResult = WorkplaceReplaceResult.delete(atomTask);
		assertThat(workplaceReplaceResult.getWorkplaceReplacement().name().equals(WorkplaceReplacement.DELETE.name())).isTrue();
		assertThat(workplaceReplaceResult.getPersistenceProcess().get().equals(atomTask)).isTrue();
	}

	@Test
	public void testAlreadyBelong () {
		WorkplaceReplaceResult workplaceReplaceResult = WorkplaceReplaceResult.alreadyBelong("01");
		assertThat(workplaceReplaceResult.getWorkplaceReplacement().name().equals(WorkplaceReplacement.ALREADY_BELONGED.name())).isTrue();
		assertThat(workplaceReplaceResult.getWorkplaceGroupId().get().equals("01")).isTrue();
	}

	@Test
	public void testBelongAnother () {
		WorkplaceReplaceResult workplaceReplaceResult = WorkplaceReplaceResult.belongAnother("01");
		assertThat(workplaceReplaceResult.getWorkplaceReplacement().name().equals(WorkplaceReplacement.BELONGED_ANOTHER.name())).isTrue();
		assertThat(workplaceReplaceResult.getWorkplaceGroupId().get().equals("01")).isTrue();
	}
}
