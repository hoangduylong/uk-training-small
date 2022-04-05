package nts.uk.shr.sample.dtoloader;

import javax.ejb.Stateless;

@Stateless
public class SampleFinder implements SampleDTOLoader {
	
	public SampleDTO find() {
		return new SampleDTO(100, "hello", true);
	}

	@Override
	public SampleDTO load() {
		return this.find();
	}

}
