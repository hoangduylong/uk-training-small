/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.command.mailserver;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.env.app.find.mailserver.MailServerDto;
import nts.uk.ctx.sys.env.dom.mailserver.MailServer;
import nts.uk.ctx.sys.env.dom.mailserver.MailServerRepository;
import nts.uk.ctx.sys.env.dom.mailserver.UseAuthentication;
import nts.uk.ctx.sys.env.dom.mailserver.UseServer;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class MailServerSaveCommandHandler.
 */
@Stateless
public class MailServerSaveCommandHandler extends CommandHandler<MailServerSaveCommand> {
	
	private static final int POP_BEFORE_SMTP = 0;
	private static final int IMAP_BEFORE_SMTP = 1;
	private static final int SMTP_AUTH_LOGIN = 2;
	private static final int SMTP_AUTH_PLAIN = 3;
	private static final int SMTP_AUTH_CRAM_MD5 = 4;

	/** The repository. */
	@Inject
	private MailServerRepository repository;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.arc.layer.app.command.CommandHandler#handle(nts.arc.layer.app.command
	 * .CommandHandlerContext)
	 */
	@Override
	protected void handle(CommandHandlerContext<MailServerSaveCommand> context) {
		// Get Company Id
		String companyId = AppContexts.user().companyId();

		// Get command
		MailServerSaveCommand command = context.getCommand();

		// Find Mail server setting
		Optional<MailServer> mailSetting = this.repository.findBy(companyId);

		// Update
		if (mailSetting.isPresent()) {
			MailServerDto dto = new MailServerDto();
			mailSetting.get().saveToMemento(dto);
			
			if(command.getUseAuth() != UseAuthentication.USE.value){
				command.setAuthMethod(dto.getAuthMethod());
				command.setPassword(dto.getPassword());
				command.setImapDto(new ImapInfoDto(dto.getImapDto().getImapServer(), dto.getImapDto().getImapUseServer(), dto.getImapDto().getImapPort()));
				command.setPopDto(new PopInfoDto(dto.getPopDto().getPopServer(), dto.getPopDto().getPopUseServer(), dto.getPopDto().getPopPort()));
				command.setEncryptionMethod(dto.getEncryptionMethod());
			}else {
				switch(command.getAuthMethod()){
					case POP_BEFORE_SMTP:
						command.setImapDto(new ImapInfoDto(dto.getImapDto().getImapServer(), 
									dto.getImapDto().getImapUseServer(), 
									dto.getImapDto().getImapPort()
								));
						command.setPopDto(new PopInfoDto(command.getPopDto().getPopUseServer() == UseServer.USE.value ? command.getPopDto().getPopServer() : dto.getPopDto().getPopServer(), 
									command.getPopDto().getPopUseServer(), 
									command.getPopDto().getPopPort()
								));
						command.setEncryptionMethod(dto.getEncryptionMethod());
						break;
					case IMAP_BEFORE_SMTP: 
						command.setPopDto(new PopInfoDto(dto.getPopDto().getPopServer(), 
								dto.getPopDto().getPopUseServer(), 
								dto.getPopDto().getPopPort()
							));
						command.setImapDto(new ImapInfoDto(command.getImapDto().getImapUseServer() == UseServer.USE.value ? command.getImapDto().getImapServer() : dto.getImapDto().getImapServer(), 
								command.getImapDto().getImapUseServer(), 
								command.getImapDto().getImapPort()
							));
						command.setEncryptionMethod(dto.getEncryptionMethod());
						break;
					case SMTP_AUTH_LOGIN:
						command.setImapDto(new ImapInfoDto(dto.getImapDto().getImapServer(), 
									dto.getImapDto().getImapUseServer(), 
									dto.getImapDto().getImapPort()
								));
						command.setPopDto(new PopInfoDto(dto.getPopDto().getPopServer(), 
									dto.getPopDto().getPopUseServer(), 
									dto.getPopDto().getPopPort()
								));
						break;
					case SMTP_AUTH_PLAIN: 
						command.setImapDto(new ImapInfoDto(dto.getImapDto().getImapServer(), 
									dto.getImapDto().getImapUseServer(), 
									dto.getImapDto().getImapPort()
								));
						command.setPopDto(new PopInfoDto(dto.getPopDto().getPopServer(), 
									dto.getPopDto().getPopUseServer(), 
									dto.getPopDto().getPopPort()
								));
						break;
					case SMTP_AUTH_CRAM_MD5:
						command.setImapDto(new ImapInfoDto(dto.getImapDto().getImapServer(), dto.getImapDto().getImapUseServer(), dto.getImapDto().getImapPort()));
						command.setPopDto(new PopInfoDto(dto.getPopDto().getPopServer(), dto.getPopDto().getPopUseServer(), dto.getPopDto().getPopPort()));
						command.setEncryptionMethod(dto.getEncryptionMethod());
						break;
				}
			
			}
			MailServer mailServer = new MailServer(command);
			this.repository.update(mailServer);
			return;
		}
		
		MailServer mailServer = new MailServer(command);
		// Create
		this.repository.add(mailServer);
	}

}
