package nts.uk.ctx.sys.gateway.app.service.accessrestrictions;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import lombok.val;
import mockit.Expectations;
import mockit.Mocked;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.AccessRestrictions;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.AccessRestrictionsRepository;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;
import nts.uk.shr.com.enumcommon.NotUseAtr;
import nts.uk.shr.com.net.Ipv4Address;


// AppContexts.user()がstaticのためテストできず。

public class ValidateAccessableTest {
	@Mocked ValidateAccessable validateAccessable;
	@Mocked	AccessRestrictionsRepository accessRestrictionsRepository;
	@Mocked LoginUserContext loginUserContext;
	
	static class Dummy{
		private static String tenantCode = "000000000000-0000";
		private static ContractCode contractCode = new ContractCode(tenantCode);
		private static Ipv4Address address = Ipv4Address.parse("255.255.255.255");
		private static AccessRestrictions restrictions = new AccessRestrictions(tenantCode, NotUseAtr.USE, null);
	}

	//@Test
	public void testNotRestreictions() {
		
		Optional<AccessRestrictions> optRestrictions = Optional.empty();
		
		new Expectations() {{
			AppContexts.user();
			result = loginUserContext;
			
			loginUserContext.contractCode();
			result = Dummy.tenantCode;
			
			accessRestrictionsRepository.get(Dummy.contractCode);
			result = optRestrictions;
			
			optRestrictions.get().isAccessable(Dummy.address);
			result = true;
		}};
		
		val result = validateAccessable.validate(Dummy.address);

		assertThat(result).isEqualTo(true);
	}
	
	//@Test
	public void testExistRestreictions() {
		
		Optional<AccessRestrictions> optRestrictions = Optional.of(Dummy.restrictions);
		
		new Expectations() {{
			AppContexts.user().contractCode();
			result = Dummy.tenantCode;
			
			accessRestrictionsRepository.get(Dummy.contractCode);
			result = optRestrictions;
			
			optRestrictions.get().isAccessable(Dummy.address);
			result = true;
		}};
		
		val result = validateAccessable.validate(Dummy.address);

		assertThat(result).isEqualTo(true);
	}

}
