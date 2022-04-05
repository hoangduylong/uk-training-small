package nts.uk.ctx.sys.portal.dom.notice;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import nts.uk.ctx.sys.portal.dom.notice.service.MessageNoticeServiceTest;

@RunWith(Suite.class)
@SuiteClasses({
	MessageNoticeTest.class,
	MessageNoticeServiceTest.class
})
public class MessageNoticeTestSuite {}
