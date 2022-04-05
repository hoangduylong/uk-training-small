package nts.uk.shr.sample.aspose;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.file.export.ExportService;
import nts.arc.layer.app.file.export.ExportServiceContext;

@Stateless
public class SampleAsposeExportService extends ExportService<Object> {

	@Inject
	private SampleAsposeGenerator generator;
	
	@Override
	protected void handle(ExportServiceContext<Object> context) {
		
		@SuppressWarnings("serial")
		List<SampleDepartment> depts = new ArrayList<SampleDepartment>() {
			{
				@SuppressWarnings("serial")
				List<SampleEmployee> employees = new ArrayList<SampleEmployee>() {
					{
						add(new SampleEmployee("00089022", "山田", 1, 22222, 3, 4, 99));
						add(new SampleEmployee("00089023", "田原", 1, 0, 99999, 14, 12));
						add(new SampleEmployee("00089024", "太郎", 2, 3, 2, 9, 0));
					}
				};
				add(new SampleDepartment("部門：　987654321", employees));
				
				List<SampleEmployee> employees1 = new ArrayList<SampleEmployee>() {
					{
						add(new SampleEmployee("00099136", "木村aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaamm", 33333, 1, 1, 0, 0));
						add(new SampleEmployee("00099137", "本田ffffffffffffffffffffffffffffffffffffffffffffffffffffffffmm", 37, 1, 1, 0, 1));
						add(new SampleEmployee("00099138", "鈴木", 86, 1, 0, 10, 6));
						add(new SampleEmployee("00099139", "中川", 3333, 4, 3, 8, 8));
						add(new SampleEmployee("00099140", "大木", 7773, 9, 0, 0, 0));
						add(new SampleEmployee("00099141", "管理", 443, 0, 0, 0, 0));
					}
				};
				add(new SampleDepartment("部門：　123234545", employees1));
			}
		};
		
		generator.generate(context.getGeneratorContext(), depts);
	}
	
}
