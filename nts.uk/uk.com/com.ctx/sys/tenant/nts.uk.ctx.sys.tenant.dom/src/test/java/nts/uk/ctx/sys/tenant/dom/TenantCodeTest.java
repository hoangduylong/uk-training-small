package nts.uk.ctx.sys.tenant.dom;

import org.junit.Test;

import lombok.val;

public class TenantCodeTest {

	@Test
	public void test() {
		val target = new TenantCode("987654321096");
		target.validate();
	}

}
