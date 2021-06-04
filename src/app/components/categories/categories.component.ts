import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  c_unactive = false;
  c_active = true;
  cat_id: any;
  auth_token = sessionStorage.getItem('auth_token');
  allcategories: any;
  message: any;
  loading = true;
  products: any;
  firstcategorie = true;
  firstcategoriedatas: any;
  selectedItem: any;
  searchcategories: any;
  constructor(private spinner: NgxSpinnerService,private toastr:ToastrService,private router:Router,private http:HttpClient,private activeroute:ActivatedRoute, private route:Router, private crexinservice:CrexinService) { }

  ngOnInit(): void {
    // this.crexinservice.firstcategorie().subscribe((res)=>{
    //   console.log(res.categories);
    //   this.firstcategoriedatas = res;
    //   this.loading = false;
    // });
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/searchcategories?category='+sessionStorage.getItem('search_categorie'),{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      console.log(res.categories);
      this.searchcategories = res.categories;
      // this.products = res.products;
      this.loading = false;
    })
    this.crexinservice.getallcategories().subscribe((res)=>{
      console.log(res.categories);
      this.allcategories = res.categories;
      this.loading = false;
    });
  }
  categoriedetails(event,cat_id:any,categorie){
    // console.log(categorie);
    this.selectedItem = categorie;
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/equipmentslist?data='+cat_id,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      this.spinner.show(); 
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);
      console.log(res);
      this.products = res;
    //  this.toastr.success(this.message,res.message,{
    //   positionClass: 'toast-top-center'
    // });
   },(error)=>{
     console.log(error);
    this.toastr.error(this.message,error.error.error,{
      positionClass: 'toast-top-center'
    });
   })
   this.firstcategorie = false;
    // this.router.navigate(['/categorie'])
  }
  singleproduct(id:any){
   sessionStorage.setItem('p_id', id);
   this.route.navigate(['/subcategories'])
  }
  search(search_categorie){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/searchcategories?category='+search_categorie,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      console.log(res.categories);
      this.allcategories = res.categories;
      // this.products = res.products;
    })
  }
  subcategories(id:any,name:any){
    console.log(name);
    sessionStorage.setItem('cat_id', id);
    sessionStorage.setItem('cat_name', name);
    this.c_active = false;
    this.c_unactive = true;
    this.route.navigate(['/subcategories']);
  }
}
