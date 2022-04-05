package nts.uk.ctx.sys.gateway.dom.login;

import java.util.Optional;

import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;

/**
 * 社員のログイン可否
 * ある社員がログイン可能な状態であるかを表す
 */
@RequiredArgsConstructor
@EqualsAndHashCode
public class EmployeeUserAvailability {

	public final Optional<ErrorType> errorType;
	
	public boolean isAvailable() {
		return !errorType.isPresent();
	}
	
	public ErrorType getErrorType() {
		return errorType.get();
	}
	
	public enum ErrorType {
		
		/** 入社していない */
		NOT_ENTERED,
		
		/** 退職している */
		RETIRED,
		
		/** 所属情報のいずれかが存在していない */
		INVALID_AFFILIATION,
	}
}
