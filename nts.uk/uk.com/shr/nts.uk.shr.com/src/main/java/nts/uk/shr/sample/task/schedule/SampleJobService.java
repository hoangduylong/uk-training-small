package nts.uk.shr.sample.task.schedule;

import javax.ejb.Stateless;

import lombok.extern.slf4j.Slf4j;
import nts.arc.task.data.TaskDataSetter;

@Stateless
@Slf4j
public class SampleJobService {
	
	public void doSomething(TaskDataSetter runtimeData, String data) {

		runtimeData.setData("count", 0);
		log.info("SampleJobService executed: " + data);
		
		for (int i = 0; i < 2; i++) {
			try {
				Thread.sleep(10000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
			runtimeData.updateData("count", i + 1);
		}
	}
}
