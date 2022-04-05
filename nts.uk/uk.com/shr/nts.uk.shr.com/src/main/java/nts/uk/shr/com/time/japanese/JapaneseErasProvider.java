package nts.uk.shr.com.time.japanese;

import java.util.Optional;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import lombok.extern.slf4j.Slf4j;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;

@ApplicationScoped
@Slf4j
//@Stateless
public class JapaneseErasProvider {

//	private JapaneseEras eras;
	
//	@Inject
//	private JapaneseErasAdapter adapter;
	
	@PostConstruct
	public void initialize() {
		log.info("[INIT START] nts.uk.shr.com.time.japanese.JapaneseErasProvider");
		
//		this.eras = this.adapter.getAllEras();
		
		log.info("[INIT END] nts.uk.shr.com.time.japanese.JapaneseErasProvider");
	}
	
	public JapaneseEras getAllEras() {
		return null;//this.adapter.getAllEras(); 
	}
	
	public Optional<JapaneseEraName> eraOf (GeneralDate date) {
		return this.getAllEras().eraOf(date);
	}

	public Optional<JapaneseEraName> eraOf (GeneralDateTime datetime) {
		return this.getAllEras().eraOf(GeneralDate.ymd(datetime.year(), datetime.month(), datetime.day()));
	}
	
	public JapaneseDate toJapaneseDate (GeneralDate date) {
		Optional<JapaneseEraName> era = this.getAllEras().eraOf(date);
		return new JapaneseDate(date, era.get());
	}
}
