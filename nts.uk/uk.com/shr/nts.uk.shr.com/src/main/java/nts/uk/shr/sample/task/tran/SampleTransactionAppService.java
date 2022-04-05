package nts.uk.shr.sample.task.tran;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.task.AsyncTaskInfoRepository;
import nts.arc.task.data.AsyncTaskData;
import nts.arc.task.tran.TransactionService;
import nts.uk.shr.infra.file.storage.info.StoredPackInfoRepository;

@Stateless
public class SampleTransactionAppService {
	
	@SuppressWarnings("unused")
	@Inject
	private SampleOtherTran otherTran;

	@Inject
	private AsyncTaskInfoRepository testRepo;
	@Inject
	private StoredPackInfoRepository testRepo2;
	
	@SuppressWarnings("deprecation")
	public void test() {
		
		this.testRepo.insertTaskData("1", new AsyncTaskData("X", "XYZ"));

		//this.otherTran.goOtherTran();
		TransactionService.newTran(() -> {
			this.testRepo2.add("x", "aaa", "test");
		});
		
		this.testRepo.insertTaskData("1", new AsyncTaskData("a", "hello"));
		this.testRepo.insertTaskData("1", new AsyncTaskData("b", "bbbb"));
		
		boolean x = true;
		if (x) {
			throw new RuntimeException("hoge");
		}
		
		
	}
}
