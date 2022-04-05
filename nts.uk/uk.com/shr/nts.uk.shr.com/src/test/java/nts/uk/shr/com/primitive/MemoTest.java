package nts.uk.shr.com.primitive;

import org.junit.Test;

import lombok.val;
import nts.arc.primitive.PrimitiveValueConstraintException;

public class MemoTest {

	@Test
	public void test() {
		new Memo(create500CharsFullWidth()).validate();
	}
	
	@Test(expected = PrimitiveValueConstraintException.class)
	public void failed_maxLength() {
		new Memo(create500CharsFullWidth() + "a").validate();
	}

	private static String create500CharsFullWidth() {
		val sb = new StringBuilder();
		for (int i = 0; i < 50; i++) {
			sb.append("１２３４５");
		}
		return sb.toString();
	}
}
