import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    template: `<div class="row justify-content-center">
        <div class="col-md-6">
            <div class="page-404">
                <div class="number font-green"> 404 </div>
                <div class="details">
                    <h3>Oops! You're lost.</h3>
                    <p> We can not find the page you're looking for.
                        <br>
                        <router-link to="/">Return home</router-link> or try the search bar below.
                    </p>
                    <div class="form-group">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control">
                            <div class="input-group-append">
                                <span class="btn btn-secondary">
                                    <i class="fa fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    style: `
    .list-group-item
    {
      color: #fff;
      background-color: #23b7e5;
    }
    
    .list-group-item:hover
    {
      cursor: pointer;
      background-color: #16aad8 !important;
    }
    
    .list-group-item .text-muted
    {
      float: right;
    }
    
    .list-group-item .text-muted:before
    {
      color: #fff;
    }
    
    .page-404,.page-500
    {
      margin-top: 120px;
      text-align: center;
    }
    
    .page-404 .number,  .page-500 .number
    {
      font-size: 125px;
      position: relative;
      display: inline-block;
      color: #158CBA;
    }
    
    .page-404 .details,  .page-500 .details
    {
      text-align: left;
      margin-left: 40px;
      display: inline-block;
    }
    
    .page-404:not(.page-404) .number,  .page-500:not(.page-404) .number
    {
      display: inline-block;
      color: #ec8c8c;
      text-align: right;
    }
    
    .page-404-3,  .page-500-3
    {
      background: #000 !important;
    }
    
    .page-404-3 .page-inner img,    .page-500-3 .page-inner img
    {
      right: 0;
      bottom: 0;
      z-index: -1;
      position: absolute;
    }
    
    .page-404-3 .error-404,    .page-500-3 .error-404
    {
      color: #fff;
      text-align: left;
      padding: 70px 20px 0;
    }
    
    .page-404-3 h1,    .page-500-3 h1
    {
      color: #fff;
      font-size: 130px;
      line-height: 160px;
    }
    
    .page-404-3 h2,    .page-500-3 h2
    {
      color: #fff;
      font-size: 30px;
      margin-bottom: 30px;
    }
    
    .page-404-3 p,    .page-500-3 p
    {
      color: #fff;
      font-size: 16px;
    }
    
    .page-404-full-page,  .page-500-full-page
    {
      overflow-x: hidden;
      padding: 20px;
      margin-bottom: 20px;
      background-color: #fafafa !important;
    }
    
    .page-404-full-page .details input,    .page-500-full-page .details input
    {
      background-color: #fff;
    }
    
    @media (max-width: 480px)
    {
      .page-404 .details,  .page-404 .number,  .page-500 .details,  .page-500 .number
      {
        text-align: center;
        margin-left: 0;
      }
    
      .page-404-full-page .page-404
      {
        margin-top: 30px;
      }
    
      .page-404-3 .error-404
      {
        text-align: left;
        padding-top: 10px;
      }
    
      .page-404-3 .page-inner img
      {
        right: 0;
        bottom: 0;
        z-index: -1;
        position: fixed;
      }
    }`
})
export class Page404Component extends Vue {
    public created() {
        this.pgName = 'page_not_found';
    }
}