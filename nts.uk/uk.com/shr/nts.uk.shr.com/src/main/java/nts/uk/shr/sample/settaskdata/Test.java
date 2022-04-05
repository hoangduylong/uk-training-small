package nts.uk.shr.sample.settaskdata;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import nts.arc.layer.app.command.JavaTypeResult;
import nts.arc.task.AsyncTask;
import nts.arc.task.AsyncTaskService;
import nts.arc.task.data.TaskDataSetter;

@Path("loadresource1")
public class Test {
	@Inject
	private AsyncTaskService managedTaskService;
	TaskDataSetter setter = new TaskDataSetter();
	@Path("test")
	@POST
	public JavaTypeResult<String> test() {

		AsyncTask task = AsyncTask.builder().withContexts().keepsTrack(true).build(() -> {
			//task
			run();
		});

		task.setDataSetter(setter);
		this.managedTaskService.execute(task);
		return new JavaTypeResult<String>(task.getId());
	}

	public void run() {
		System.out.println("start");
		//set task data
		setter.setData("processing", 0);
		setter.setData("processing2", 0);
		//update task data
		for(int i =0;i<10;i++){
			setter.updateData("processing", i);
			setter.updateData("processing2", i);
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	}
}
