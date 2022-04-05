/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.infra.repository.mailserver;

import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.env.dom.mailserver.MailServer;
import nts.uk.ctx.sys.env.dom.mailserver.MailServerRepository;
import nts.uk.ctx.sys.env.infra.entity.mailserver.SevmtMailServer;

/**
 * The Class JpaMailServerRepository.
 */
@Stateless
public class JpaMailServerRepository extends JpaRepository implements MailServerRepository {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailserver.MailServerRepository#findBy(java.lang.
	 * String)
	 */
	@Override
	public Optional<MailServer> findBy(String companyId) {
		return this.queryProxy().find(companyId, SevmtMailServer.class).map(e -> this.toDomain(e));
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailserver.MailServerRepository#add(nts.uk.ctx.sys
	 * .env.dom.mailserver.MailServer)
	 */
	@Override
	public void add(MailServer mailSetting) {
		this.commandProxy().insert(this.toEntity(mailSetting));
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailserver.MailServerRepository#update(nts.uk.ctx.
	 * sys.env.dom.mailserver.MailServer)
	 */
	@Override
	public void update(MailServer mailSetting) {
		Optional<SevmtMailServer> optinal = this.queryProxy().find(mailSetting.getCompanyId(),
				SevmtMailServer.class);

		SevmtMailServer entity = optinal.get();

		JpaMailServerSetMemento memento = new JpaMailServerSetMemento(entity);
		mailSetting.saveToMemento(memento);

		this.commandProxy().update(entity);

	}

	/**
	 * To entity.
	 *
	 * @param domain
	 *            the domain
	 * @return the sevst mail server
	 */
	private SevmtMailServer toEntity(MailServer domain) {
		SevmtMailServer entity = new SevmtMailServer();
		domain.saveToMemento(new JpaMailServerSetMemento(entity));
		return entity;
	}

	/**
	 * To domain.
	 *
	 * @param entity
	 *            the entity
	 * @return the mail server
	 */
	private MailServer toDomain(SevmtMailServer entity) {
		return new MailServer(new JpaMailServerGetMemento(entity));
	}

}
