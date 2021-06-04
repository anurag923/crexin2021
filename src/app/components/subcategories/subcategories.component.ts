import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {
  auth_token = sessionStorage.getItem('auth_token');
  singleproducts: any;
  message: string;
  allcategories: any;
  products: any;
  sproduct:boolean;
  cat_id: any;
  selectedItem: any;
  defaultproducts: any;
  loading = true;
  d = true;
  p = false;
  cat_name = sessionStorage.getItem('cat_name');
  constructor(private toastr:ToastrService,private router:Router,private http:HttpClient,private activeroute:ActivatedRoute, private route:Router, private crexinservice:CrexinService) { }

  ngOnInit(): void {
    this.subcategories(sessionStorage.getItem('cat_id'),sessionStorage.getItem('cat_name'));
    this.crexinservice.getallcategories().subscribe((res)=>{
      console.log(res.categories);
      this.allcategories = res.categories
      this.loading = false;
    })
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/subcategories/'+sessionStorage.getItem('cat_id'),{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
     console.log(res.subcategories);
     if(res.subcategories.length === 0 || res.subcategories.length === null){
      this.toastr.error(this.message,'No equipments available at this moment',{
        positionClass: 'toast-top-center'
      });
     }
     else{
      this.defaultproducts = res.subcategories;
      console.log(this.defaultproducts)
     }
     this.loading = false;
   },(error)=>{
     console.log(error);
    this.toastr.error(this.message,error.error.error,{
      positionClass: 'toast-top-center'
    });
   })

  }
  subcategories(cat_id:any,categorie){
    // console.log(name);
    // sessionStorage.setItem('cat_name', name);
    this.selectedItem = categorie; 
    sessionStorage.setItem('cat_id',cat_id);
    this.cat_id = cat_id;
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/subcategories/'+this.cat_id,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
     console.log(res.subcategories);
     if(res.subcategories.length === 0 || res.subcategories.length === null ){
      this.toastr.error(this.message,'No equipments available at this moment',{
        positionClass: 'toast-top-center'
      });
      // this.products = false;
     }
     else{
      this.products = res.subcategories;
     }
     this.loading = false;
   },(error)=>{
     console.log(error);
    this.toastr.error(this.message,error.error.error,{
      positionClass: 'toast-top-center'
    });
   });
   this.d = false;
   this.p = true;
  }
  singleproduct(id:any){
    sessionStorage.setItem('sub_id', id);
    this.router.navigate(['/singleproduct']);
    // const headers= new HttpHeaders()
    // .set('content-type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    // .set('Authorization',`Bearer ${this.auth_token}`);
    // this.http.get<any>('https://www.superuser.crexin.com/api/single_equipment?equipment_id='+sessionStorage.getItem('p_id'),{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
    //   console.log(res);
    //   this.singleproducts = res;
    // });
    // this.single_product = true;
    // this.categorie_products = false;
  }
  search(search_categorie){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>(`https://superuser.crexin.com/api/searchsubcategories?categoryid=${sessionStorage.getItem('cat_id')}&subcategory=${search_categorie}`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      console.log(res);
      // console.log(res.category);
      // console.log(res.products);
      if(res.subcategories.length === 0 || res.subcategories.length === null){
        this.toastr.error(this.message,'Data not found',{
          positionClass: 'toast-top-center'
        });
      }
      else{
        this.products = res.subcategories;
        this.defaultproducts = res.subcategories;
      }
      // this.products = res.products;
    })
  }
  categories(){
    this.router.navigate(['/categories']);
  }
}
