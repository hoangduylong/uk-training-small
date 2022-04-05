package nts.uk.shr.com.license.option.purchasestate;

import java.util.Optional;

import nts.arc.time.GeneralDate;

public class Option {

	OptionType type;

	Optional<GeneralDate> trialStartDate;

	public Option(OptionType type, Optional<GeneralDate> trialStartDate) {
		this.type = type;
		this.trialStartDate = trialStartDate;
	}

	void startTrial(GeneralDate startDate) {
		//TODO
	}
}
