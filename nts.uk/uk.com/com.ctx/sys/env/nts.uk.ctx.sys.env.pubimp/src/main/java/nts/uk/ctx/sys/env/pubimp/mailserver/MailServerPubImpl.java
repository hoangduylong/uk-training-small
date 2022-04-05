package nts.uk.ctx.sys.env.pubimp.mailserver;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.env.dom.mailserver.MailServer;
import nts.uk.ctx.sys.env.dom.mailserver.MailServerRepository;
import nts.uk.ctx.sys.env.dom.mailserver.UseAuthentication;
import nts.uk.ctx.sys.env.pub.mailserver.ImapInfoExport;
import nts.uk.ctx.sys.env.pub.mailserver.MailServerExport;
import nts.uk.ctx.sys.env.pub.mailserver.MailServerPub;
import nts.uk.ctx.sys.env.pub.mailserver.MailServerSetExport;
import nts.uk.ctx.sys.env.pub.mailserver.PopInfoExport;
import nts.uk.ctx.sys.env.pub.mailserver.SmtpInfoExport;

@Stateless
public class MailServerPubImpl implements MailServerPub{

	@Inject
	private MailServerRepository mailServerRepository;
	
	@Override
	public boolean findBy(String companyId) {
		Optional<MailServer> data = mailServerRepository.findBy(companyId);
		if(!data.isPresent()) {
			return false;
		}
		
		return data.get().getUseAuthentication()==UseAuthentication.NOT_USE?false:true;
	}

	@Override
	public MailServerSetExport checkMailServerSet(String companyID) {
		// ドメインモデル「メールサーバ」を取得する(get domain「メールサーバ」 )
		Optional<MailServer> opMailServer = mailServerRepository.findBy(companyID);
		if(!opMailServer.isPresent()) {
			// メールサーバ設定済区分=false(MailServerSetAtr= false)
			return new MailServerSetExport(false, Optional.empty());
		}
		// 取得したドメインモデル「メールサーバ」を返す(Trả về domain 「メールサーバ」 đã get)
		MailServer mailServer = opMailServer.get();
		return new MailServerSetExport(
				true, 
				Optional.of(new MailServerExport(
						mailServer.getCompanyId(), 
						mailServer.getAuthenticationMethod().value, 
						mailServer.getEncryptionMethod().value, 
						mailServer.getAuthenticationMethod().value, 
						mailServer.getEmailAuthentication().v(), 
						mailServer.getPassword().v(), 
						new SmtpInfoExport(
								mailServer.getSmtpInfo().getServer().v(), 
								mailServer.getSmtpInfo().getPort().v()), 
						new PopInfoExport(
								mailServer.getPopInfo().getServer().v(), 
								mailServer.getPopInfo().getUseServer().value, 
								mailServer.getPopInfo().getPort().v()), 
						new ImapInfoExport(
								mailServer.getImapInfo().getServer().v(), 
								mailServer.getImapInfo().getUseServer().value, 
								mailServer.getImapInfo().getPort().v()))));
	}

}
