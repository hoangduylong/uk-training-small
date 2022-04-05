package nts.uk.ctx.sys.portal.infra.repository.standardwidget;

import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget.ApproveWidgetRepository;
import nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget.StandardWidget;
import nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget.StandardWidgetType;
import nts.uk.ctx.sys.portal.infra.entity.standardwidget.SptmtAppWidget;
import nts.uk.ctx.sys.portal.infra.entity.standardwidget.SptmtApproveWidget;
import nts.uk.ctx.sys.portal.infra.entity.standardwidget.SptmtWidgetWork;

@Stateless
public class JpaApproveWidgetRepository extends JpaRepository implements ApproveWidgetRepository {

	private static final String FIND_BY_APPROVE_STATUS = "SELECT a from SptmtApproveWidget a WHERE a.companyId =:companyId";
	
	private static final String FIND_BY_APP_STATUS = "SELECT a from SptmtAppWidget a WHERE a.companyId =:companyId";

	@Override
	public Optional<StandardWidget> findByWidgetTypeAndCompanyId(StandardWidgetType standardWidgetType, String companyId) {
		
		if (standardWidgetType == StandardWidgetType.APPROVE_STATUS) {
			return this.queryProxy().query(FIND_BY_APPROVE_STATUS, SptmtApproveWidget.class)
					.setParameter("companyId", companyId).getSingle().map(SptmtApproveWidget::toDomain);
		} else if (standardWidgetType == StandardWidgetType.APPLICATION_STATUS) {
			return this.queryProxy().query(FIND_BY_APP_STATUS, SptmtAppWidget.class)
					.setParameter("companyId", companyId).getSingle().map(SptmtAppWidget::toDomain);
		} else if (standardWidgetType == StandardWidgetType.WORK_STATUS) {
			return this.queryProxy().find(companyId, SptmtWidgetWork.class).map(x -> x.toDomain());
		}
		return Optional.empty();
	}
	
	@Override
	public void updateApproveStatus(StandardWidget standardWidget, String companyId) {

		Optional<SptmtApproveWidget> sptmtApproveWidget = this.queryProxy()
				.query(FIND_BY_APPROVE_STATUS, SptmtApproveWidget.class).setParameter("companyId", companyId).getSingle();
		
		if (sptmtApproveWidget.isPresent()) {
			SptmtApproveWidget approveWidgetEntity = sptmtApproveWidget.get();

			SptmtApproveWidget.toEntity(approveWidgetEntity, standardWidget);
			
			this.commandProxy().update(approveWidgetEntity);
		} else {
			
			SptmtApproveWidget approveWidgetEntity = new SptmtApproveWidget();
			SptmtApproveWidget.toEntity(approveWidgetEntity, standardWidget);
			
			this.commandProxy().insert(approveWidgetEntity);
		}
		
	}

	@Override

	public void saveWorkStatus(StandardWidget domain) {
		domain.getDetailSettingStandardWidgetTypes().stream().forEach(x -> {
			if(x.getStandardWidgetType() == StandardWidgetType.WORK_STATUS) {
				Optional<SptmtWidgetWork> e = this.queryProxy().find(domain.getCompanyID(), SptmtWidgetWork.class);
				if(e.isPresent()) {
					this.commandProxy().update(new SptmtWidgetWork(domain));
				}else {
					this.commandProxy().insert(new SptmtWidgetWork(domain));
				}
			}
		});
	}
	

	public void updateAppStatus(StandardWidget standardWidget) {

		Optional<SptmtAppWidget> appWidgetOpt = this.queryProxy().query(FIND_BY_APP_STATUS, SptmtAppWidget.class)
				.setParameter("companyId", standardWidget.getCompanyID()).getSingle();

		if (appWidgetOpt.isPresent()) {

			SptmtAppWidget entity = appWidgetOpt.get();

			entity.update(standardWidget);

			this.commandProxy().update(entity);
		}
	}

	@Override
	public void addAppStatus(StandardWidget standardWidget) {
		
		SptmtAppWidget entity = SptmtAppWidget.toEntity(standardWidget);
		
		this.commandProxy().insert(entity);
	}

}
