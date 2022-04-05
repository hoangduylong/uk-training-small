package nts.uk.shr.infra.i18n.loading;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

import javax.ejb.Stateless;

import org.apache.commons.lang3.LocaleUtils;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.primitive.StringPrimitiveValue;
import nts.uk.shr.infra.i18n.dto.LanguageMasterDto;
import nts.uk.shr.infra.i18n.entity.LanguageMaster;

@Stateless
public class LanguageMasterRepositoryImpl extends JpaRepository implements LanguageMasterRepository {

	public LanguageMasterRepositoryImpl() {
	}

	@Override
	public List<LanguageMasterDto> getSystemLanguages() {
		return this.forDefaultDataSource(em ->{
			return this.queryProxy(em).query("SELECT l FROM LanguageMaster l", LanguageMaster.class).getList(l -> {
				return new LanguageMasterDto(l.getLanguageId(), l.getLanguageCode(), l.getLanguageName());
			});
		});
	}

	@Override
	public Optional<LanguageMasterDto> getSystemLanguage(String languageId) {
		return this.queryProxy().find(new StringPrimitiveValue<>(languageId), LanguageMaster.class)
			.map(l -> new LanguageMasterDto(l.getLanguageId(), l.getLanguageCode(), l.getLanguageName()));
	}

	@Override
	public boolean isJapanese(String languageId) {
		String languageCode = this.queryProxy().find(languageId, LanguageMaster.class).get().getLanguageCode();
		Locale locate = LocaleUtils.toLocale(languageCode);
		return Locale.JAPANESE.equals(locate) || Locale.JAPAN.equals(locate);
	}
}
