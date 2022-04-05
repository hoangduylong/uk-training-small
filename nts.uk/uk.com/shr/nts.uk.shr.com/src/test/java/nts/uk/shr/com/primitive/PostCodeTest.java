package nts.uk.shr.com.primitive;

import org.junit.Test;

import com.google.common.base.Strings;

import nts.arc.primitive.PrimitiveValueConstraintException;

public class PostCodeTest {

	@Test
	public void valid_case1() {
		new PostCode("1234567").validate();
	}
	
	@Test
	public void valid_case2() {
		new PostCode("098-7654").validate();
	}
	
	@Test
	public void valid_case3() {
		new PostCode("").validate();
	}
	
	@Test(expected = PrimitiveValueConstraintException.class)
	public void failed_maxLength() {
		new PostCode(Strings.repeat("9", 8)).validate();
	}
	
	@Test(expected = PrimitiveValueConstraintException.class)
	public void failed_sign() {
		new PostCode("123_4567").validate();
	}
	
	@Test(expected = PrimitiveValueConstraintException.class)
	public void failed_char() {
		new PostCode("O98-7654").validate();
	}
	
}
