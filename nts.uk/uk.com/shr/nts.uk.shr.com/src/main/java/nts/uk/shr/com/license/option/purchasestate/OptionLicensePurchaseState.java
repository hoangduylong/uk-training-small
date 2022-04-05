package nts.uk.shr.com.license.option.purchasestate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * オプションライセンスの購入状態
 * @author ai_muto
 *
 */
public class OptionLicensePurchaseState {
	String tenantCode;

	List<Option> options;

	private OptionLicensePurchaseState(String tenantCode, List<Option> options) {
		this.tenantCode = tenantCode;
		this.options = options;
	}

	public static OptionLicensePurchaseState create(String tenantCode, List<OptionType> optionTypes) {
		List<Option> options = optionTypes.stream()
			.map(t -> new Option (t, Optional.empty()))
			.collect(Collectors.toList());
		return new OptionLicensePurchaseState(
				tenantCode, options);
	}
}
