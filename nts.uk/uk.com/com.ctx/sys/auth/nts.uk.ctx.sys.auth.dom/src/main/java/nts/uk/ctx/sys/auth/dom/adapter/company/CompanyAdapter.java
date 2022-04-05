package nts.uk.ctx.sys.auth.dom.adapter.company;

import java.util.List;

/**
 * The Interface CompanyAdapter.
 */
public interface CompanyAdapter {
     
     /**
      * Find all company.
      *
      * @return the list
      */
     List<CompanyImport> findAllCompany();
     
     /**
      * Find all company import.
      *
      * @return the list
      */
     List<CompanyImport> findAllCompanyImport();
     
     /**
      * Find company by cid.
      *
      * @param cid the cid
      * @return the company import
      */
     CompanyImport findCompanyByCid(String cid);
}
