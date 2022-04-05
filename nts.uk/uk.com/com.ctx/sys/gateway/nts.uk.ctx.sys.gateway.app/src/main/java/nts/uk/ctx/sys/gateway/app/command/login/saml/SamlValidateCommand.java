package nts.uk.ctx.sys.gateway.app.command.login.saml;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.net.URLCodec;

import lombok.Data;
import lombok.SneakyThrows;
import nts.uk.ctx.sys.gateway.app.command.login.LoginCommandHandlerBase;

@Data
public class SamlValidateCommand implements LoginCommandHandlerBase.TenantAuth {
	
	private HttpServletRequest request;
	
	public SamlValidateCommand(HttpServletRequest request) {
		this.request = request;
	}

	@Override
	@SneakyThrows
	public String getTenantCode() {
		// URLエンコードされているのでデコード
		URLCodec codec = new URLCodec("UTF-8");
		String serializedRelayState = codec.decode(request.getParameter("RelayState"));
		UkRelayState relayState = UkRelayState.deserialize(serializedRelayState);
		return relayState.getTenantCode();
	}

	@Override
	@SneakyThrows
	public String getTenantPasswordPlainText() {
		// URLエンコードされているのでデコード
		URLCodec codec = new URLCodec("UTF-8");
		String serializedRelayState = codec.decode(request.getParameter("RelayState"));
		UkRelayState relayState = UkRelayState.deserialize(serializedRelayState);
		return relayState.getTenantPassword();
	}
}
