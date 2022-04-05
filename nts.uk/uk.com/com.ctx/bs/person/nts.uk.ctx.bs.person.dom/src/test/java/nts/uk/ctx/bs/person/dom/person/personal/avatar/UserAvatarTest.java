package nts.uk.ctx.bs.person.dom.person.personal.avatar;

import org.junit.Test;
import nts.arc.testing.assertion.NtsAssert;
import nts.uk.ctx.bs.person.dom.person.personal.PersonInformationHelper.UserAvatarHelper;

import static org.assertj.core.api.Assertions.assertThat;

public class UserAvatarTest {

	public final UserAvatarDto mockDto = UserAvatarHelper.getMockDto();
	
	@Test
	public void getters() {
		// when
		UserAvatar domain = UserAvatar.createFromMemento(mockDto);

		// then
		NtsAssert.invokeGetters(domain); 
	}
	
	/**
	 * Vì team chúng tôi thiết kế domain theo cơ chế get/set memento, thế nên trong domain sẽ có 3 hàm phát sinh 
	 * (createFromMemento, getMemento, setMemento)
	 * Chính vì thế, để đảm bảo coverage, chúng tôi phải test cả 3 hàm này.
	 * get / set mementoメカニズムに従ってドメインを設計しているため、ドメインには3つの生成関数（createFromMemento、getMemento、setMemento）があります。 
	 * 0カバレッジのために、3つの機能すべてをテストする必要があります。
	 */
	@Test
	public void setMemento() {
		// given
		UserAvatarDto avtarDto = UserAvatarDto.builder().build();
		UserAvatar domain = UserAvatar.createFromMemento(mockDto);

		// when
		domain.setMemento(avtarDto);

		// then
		assertThat(domain.getPersonalId()).isEqualTo(avtarDto.getPersonalId());
		assertThat(domain.getFileId()).isEqualTo(avtarDto.getFileId());
	}
	

}
