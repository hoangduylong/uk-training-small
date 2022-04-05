package nts.uk.shr.com.history.strategic;

import static nts.arc.time.GeneralDate.ymd;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import lombok.val;
import nts.arc.error.BusinessException;
import nts.arc.time.GeneralDate;
import nts.gul.text.IdentifierUtil;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;

public class ContinuousHistoryTest {

	@Test(expected = BusinessException.class)
	public void testName() {
		
		val target = new SampleHistory();

		target.add(newItem(ymd(2000, 1, 1), ymd(2000, 1, 10)));
		target.add(newItem(ymd(2000, 1, 11), ymd(2000, 1, 20)));
		
		// error
		try {
			target.add(newItem(ymd(2000, 1, 8), ymd(2000, 1, 15)));
		} catch (BusinessException ex) {
			assertThat(ex.getMessageId(), is("Msg_102"));
			throw ex;
		}
	}

	@Test(expected = BusinessException.class)
	public void test2() {
		
		val target = new SampleHistory();

		target.add(newItem(ymd(2000, 1, 1), ymd(2000, 1, 10)));
		target.add(newItem(ymd(2000, 1, 11), ymd(2000, 1, 20)));
		target.add(newItem(ymd(2000, 1, 20), ymd(2000, 1, 30)));
		
		// error
		try {
			target.changeSpan(target.latestStartItem().get(), new DatePeriod(ymd(2000, 1, 8), ymd(2000, 1, 30)));
		} catch (BusinessException ex) {
			assertThat(ex.getMessageId(), is("Msg_127"));
			throw ex;
		}
	}
	
	public static class SampleHistory implements ContinuousHistory<DateHistoryItem, DatePeriod, GeneralDate> {

		private final List<DateHistoryItem> items = new ArrayList<>();
		
		@Override
		public List<DateHistoryItem> items() {
			return this.items;
		}
	}

	
	public static DateHistoryItem newItem(GeneralDate start, GeneralDate end) {
		return new DateHistoryItem(IdentifierUtil.randomUniqueId(), new DatePeriod(start, end));
	}
}
