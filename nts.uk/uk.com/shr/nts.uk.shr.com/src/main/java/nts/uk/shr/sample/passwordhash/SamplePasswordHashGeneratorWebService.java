package nts.uk.shr.sample.passwordhash;

import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import lombok.Value;
import nts.arc.layer.app.command.JavaTypeResult;
import nts.gul.security.hash.password.PasswordHash;

@Path("/sample/passwordhash")
@Produces("application/json")
public class SamplePasswordHashGeneratorWebService {

	@POST
	@Path("generate")
	public JavaTypeResult<String> generate(PasswordHashSource source) {
		String hash = PasswordHash.generate(source.getPasswordPlainText(), source.getSalt());
		return new JavaTypeResult<>(hash);
	}
	
	@POST
	@Path("generatelist")
	public List<HashResult> generateList(List<PasswordHashSource> sources) {
		return sources.stream()
				.map(s -> new HashResult(
						s.getPasswordPlainText(),
						s.getSalt(),
						PasswordHash.generate(s.getPasswordPlainText(), s.getSalt())))
				.collect(Collectors.toList());
	}
	
	@Value
	public static class HashResult {
		private final String plainText;
		private final String salt;
		private final String hash;
	}
}
