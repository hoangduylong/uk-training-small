package nts.uk.ctx.sys.gateway.dom.login.password.authenticate;

import java.util.Optional;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.arc.task.tran.AtomTask;

/**
 *認証失敗時の永続化処理 
 */
@RequiredArgsConstructor
@Getter
public class FailedAuthenticateTask {
	private final Optional<AtomTask> failedAuthenticate;
	private final Optional<AtomTask> lockoutData;
}
