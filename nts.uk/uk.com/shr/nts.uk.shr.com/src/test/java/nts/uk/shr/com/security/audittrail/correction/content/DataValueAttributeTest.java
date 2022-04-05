package nts.uk.shr.com.security.audittrail.correction.content;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

import java.math.BigDecimal;

import org.junit.Test;

import nts.arc.time.GeneralDate;

public class DataValueAttributeTest {

	@Test
	public void formatSTRING() {
		String actual = DataValueAttribute.STRING.format("test");
		assertThat(actual, is("test"));
	}

	@Test
	public void formatCOUNT_int() {
		String actual = DataValueAttribute.COUNT.format(1);
		assertThat(actual, is("1"));
	}

	@Test
	public void formatCOUNT_BigDecimal() {
		String actual = DataValueAttribute.COUNT.format(new BigDecimal("3.5"));
		assertThat(actual, is("3.5"));
	}

	@Test
	public void formatMONEY() {
		String actual = DataValueAttribute.MONEY.format(123456789);
		assertThat(actual, is("123,456,789"));
	}

	@Test
	public void formatTIME_plus() {
		String actual = DataValueAttribute.TIME.format(130);
		assertThat(actual, is("2:10"));
	}

	@Test
	public void formatTIME_minus() {
		String actual = DataValueAttribute.TIME.format(-130);
		assertThat(actual, is("-2:10"));
	}

	@Test
	public void formatCLOCK_plus() {
		String actual = DataValueAttribute.CLOCK.format(130);
		assertThat(actual, is("当日2:10"));
	}

	@Test
	public void formatCLOCK_plus2() {
		String actual = DataValueAttribute.CLOCK.format(60*24*2 - 1);
		assertThat(actual, is("翌日23:59"));
	}

	@Test
	public void formatCLOCK_minus() {
		String actual = DataValueAttribute.CLOCK.format(-1);
		assertThat(actual, is("前日23:59"));
	}

	@Test
	public void formatDATE() {
		String actual = DataValueAttribute.DATE.format(GeneralDate.ymd(2018, 7, 30));
		assertThat(actual, is("2018/07/30"));
	}

}
