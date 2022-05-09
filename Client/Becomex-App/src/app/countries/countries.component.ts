import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Country } from '../models/Country';
import { CountryService } from '../services/country.service';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})

export class CountriesComponent implements OnInit, AfterViewInit {


  public dataSource: any =[];
  public countries: Country[] = [];
  public countriesfiltrados: Country[] = [];
  public country: any;
  private _filtroLista: string ='';
  public route: string ='';
  form: FormGroup = new FormGroup({});

  public inputOrigem: string='';
  public inputDestino: string='';


  constructor(
    private countryService: CountryService,
    private cd: ChangeDetectorRef,
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private fb: FormBuilder,
    ) { }

  public ngOnInit(): void {
    this.getCountries();
    this.form = new FormGroup({
      inputOrigem:  new FormControl(),
      inputDestino: new FormControl()
    });
  }

  public BuscarRota(template: any){
      this.openModal(template);
      this.form.reset();
      this.route = '';
  }

  public getBestRoute() : void{

    var graph = this.countries;
    var dist:any = {};
    var prev:any = {};
    var source: string = this.form.value.inputOrigem.toUpperCase();
    var target: string = this.form.value.inputDestino.toUpperCase();

    var vertices = [];
    for (var i = 0; i < graph.length; i++) {
      var vertex = graph[i];
      dist[vertex.alpha3Code] = Infinity;
      prev[vertex.alpha3Code] = null;
      vertices.push(vertex);
    }

    dist[source] = 0;

    while (vertices.length > 0) {
      var u = vertices.reduce((p, current) => {return !p || dist[current.alpha3Code] < dist[p.alpha3Code] ? current : p;});
      const index = vertices.indexOf(u);

      vertices.splice(index, 1);
      if (u.borders && Array.isArray(u.borders)) {
        for (var i = 0; i < u.borders.length; i++) {
          var v = u.borders[i];
          const alt = dist[u.alpha3Code] + 1;
          if (alt < dist[v]) {
            dist[v] = alt;
            prev[v] = u;
          }
        }
      }
    }

    var result:any = [];
    while (target) {
      console.log(target);
      result.splice(0, 0, ' '+target);
      target = prev[target] ? prev[target].alpha3Code : null;
    }
    this.route = result;

  }


  public ngAfterViewInit(): void {
  }

  public getCountries(): void {
    this.countryService.getAllCoutries().subscribe(
        (_countries: Country[]) => {
        this.dataSource = this.countriesfiltrados =  this.countries = _countries;
       },
        error => console.log(error));
  }

  public get filtroLista() : string{
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    console.log(value);
    this._filtroLista = value;
    this.countriesfiltrados = this.filtroLista ? this.filtrarCountries(this.filtroLista) : this.countries;
  }

  public filtrarCountries(filtro: string): Country[]{
    filtro = filtro.toUpperCase();
    return this.countries.filter(
      (country: Country) => country.name?.toUpperCase().indexOf(filtro) !== -1 ||
       country.alpha3Code?.toUpperCase().indexOf(filtro) !== -1

    )
  }

  public onRowClicked(row: any, template: any) {
    console.log(row);
    this.country = row;
    this.openModal(template);
  }

  openModal(template: any) {
    template.show();
  }

  fechaModal(template: any) {
    this.ngOnInit();
    template.hide();
  }

}
