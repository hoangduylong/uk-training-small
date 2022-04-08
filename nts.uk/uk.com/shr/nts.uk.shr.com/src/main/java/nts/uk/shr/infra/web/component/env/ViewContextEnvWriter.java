package nts.uk.shr.infra.web.component.env;

import java.io.IOException;
import java.time.format.DateTimeFormatter;

import javax.ejb.Stateless;
import javax.faces.context.ResponseWriter;
import javax.inject.Inject;

import lombok.val;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.system.config.ProductType;
import nts.uk.shr.com.time.japanese.JapaneseErasProvider;
import nts.uk.shr.infra.web.component.util.ObjectWriter;

@Stateless
public class ViewContextEnvWriter {
	
	@Inject
	private JapaneseErasProvider japaneseErasProvider;

	public void write(ResponseWriter rw) throws IOException {
		rw.write("__viewContext.env = {};");
		
		this.writeSystem(rw);
		this.writeJapanseEras(rw);
	}
	
	private void writeSystem(ResponseWriter rw) throws IOException {
		
		val system = AppContexts.system();
		rw.write("__viewContext.env.systemName = '" + system.getSystemName() + "';");
		rw.write("__viewContext.env.isCloud = " + bool(system.isCloud()) + ";");
		rw.write("__viewContext.env.isOnPremise = " + bool(system.isOnPremise()) + ";");

		rw.write("__viewContext.env.products = {};");
		rw.write("__viewContext.env.products.attendance = " + bool(system.isInstalled(ProductType.ATTENDANCE)) + ";");
		rw.write("__viewContext.env.products.payroll = " + bool(system.isInstalled(ProductType.PAYROLL)) + ";");
		rw.write("__viewContext.env.products.personnel = " + bool(system.isInstalled(ProductType.PERSONNEL)) + ";");
		
		rw.write("__viewContext.env.pathToManual = '" + system.getPathToManual() + "';");
	}
	
	private static String bool(boolean bool) {
		return bool ? "true" : "false";
	}
	
	private void writeJapanseEras(ResponseWriter rw) throws IOException {

		rw.write("__viewContext.env.japaneseEras = [];");
		
		val eras = this.japaneseErasProvider.getAllEras();
		for (val era : eras.getNames()) {
			rw.write("__viewContext.env.japaneseEras.push(");
			
			ObjectWriter.start(rw)
				.put("name", era.getName())
				.put("symbol", era.getSymbol())
				.put("start", DateTimeFormatter.ISO_LOCAL_DATE.format(era.startDate().localDate()))
				.put("end", DateTimeFormatter.ISO_LOCAL_DATE.format(era.endDate().localDate()))
				.finish();
			
			rw.write(");");
		}
	}
}
