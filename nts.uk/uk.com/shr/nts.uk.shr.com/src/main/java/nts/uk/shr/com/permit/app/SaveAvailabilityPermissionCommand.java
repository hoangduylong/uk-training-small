package nts.uk.shr.com.permit.app;

import java.util.List;
import java.util.stream.Collectors;

import lombok.Value;
import nts.uk.shr.com.permit.RestoreAvailabilityPermission;

@Value
public class SaveAvailabilityPermissionCommand {

	private final String roleId;
	private final List<FunctionSetting> settings;
	
	public List<RestoreAvailabilityPermission> createRestore(String companyId) {
		
		return this.settings.stream()
				.map(s -> new RestoreAvailabilityPermission() {
					@Override public String companyId() { return companyId; }
					@Override public String roleId() { return roleId; }
					@Override public boolean isAvailable() { return s.isAvailable; }
					@Override public int functionNo() { return s.functionNo; }
				})
				.map(o -> (RestoreAvailabilityPermission)o)
				.collect(Collectors.toList());
	}
	
	@Value
	public static class FunctionSetting {
		private final int functionNo;
		private final boolean isAvailable;
	}
}
