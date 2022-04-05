package nts.uk.shr.sample.aspose;

import java.util.List;

import nts.arc.layer.infra.file.export.FileGeneratorContext;

public interface SampleAsposeGenerator {
	
	void generate(FileGeneratorContext context, List<SampleDepartment> depts);
	
	void generateWithTemplate(FileGeneratorContext context, List<SampleDepartment> depts);
}
