import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations'

export interface PeriodicElement {
  name: string;
  number: number;
  description: number;
  positions: number;
  expand?:boolean
}

const ELEMENT_DATA: PeriodicElement[] = [
  {number: 1, name: 'Director', description: 1.0079, positions: 5},
  {number: 2, name: 'Post master', description: 4.0026, positions: 5},
  {number: 3, name: 'Lithium', description: 6.941, positions: 5},
  {number: 4, name: 'Beryllium', description: 9.0122, positions: 5},
  {number: 5, name: 'Boron', description: 10.811, positions: 5},
  {number: 6, name: 'Carbon', description: 12.0107, positions: 5},
  {number: 7, name: 'Nitrogen', description: 14.0067, positions: 5},
  {number: 8, name: 'Oxygen', description: 15.9994, positions: 5},
  {number: 9, name: 'Fluorine', description: 18.9984, positions: 5},
];

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TableViewComponent implements OnInit {
  displayedColumns: string[] = ['number', 'name', 'description', 'positions', 'action', 'expand'];
  displayedColumns1: string[] = [ 'name', 'description', 'positions', 'action'];

  dataSource = new MatTableDataSource<any>();
  // dataSource1 = new MatTableDataSource<any>();
  isLoading = true;
  pageNumber: number = 1;
  VOForm: FormGroup;
  isEditableNew: boolean = true;
  isExpand = true
  expandedElement = null
  

  constructor(private fb: FormBuilder,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (ELEMENT_DATA && ELEMENT_DATA.length > 0) {
      ELEMENT_DATA.map(s => {
        s.expand = false
        // s.isEditable = false
        if (s.expand) {
          this.isExpand = true
        } else {
          this.isExpand = false
        }
      })
    }
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });

     this.VOForm = this.fb.group({
              VORows: this.fb.array(ELEMENT_DATA.map(val => this.fb.group({
                number: new FormControl(val.number),
                name: new FormControl(val.name),
                description: new FormControl(val.description),
                positions: new FormControl(val.positions),
                action: new FormControl('existingRecord'),
                isEditable: new FormControl(true),
                isNewRow: new FormControl(false),
              })
              )) //end of fb array
            }); // end of form group cretation
    this.isLoading = false;
    this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
    // this.dataSource1 = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
    // this.dataSource.paginator = this.paginator;

    const filterPredicate = this.dataSource.filterPredicate;
      this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
        return filterPredicate.call(this.dataSource, data.value, filter);
      }
  }
  ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.paginatorList = document.getElementsByClassName('mat-paginator-range-label');

  //  this.onPaginateChange(this.paginator, this.paginatorList);

  //  this.paginator.page.subscribe(() => { // this is page change event
  //    this.onPaginateChange(this.paginator, this.paginatorList);
  //  });
  }
  
   applyFilter(event: Event) {
    //  debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // @ViewChild('table') table: MatTable<PeriodicElement>;
  AddNewRow() {
    // this.getBasicDetails();
    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0,this.initiateVOForm());
    this.dataSource = new MatTableDataSource(control.controls)
    // control.controls.unshift(this.initiateVOForm());
    // this.openPanel(panel);
      // this.table.renderRows();
      // this.dataSource.data = this.dataSource.data;
  }

  // this function will enabled the select field for editd
  EditSVO(VOFormElement, i) {

    // VOFormElement.get('VORows').at(i).get('name').disabled(false)
    VOFormElement.get('VORows').at(i)!.get('isEditable').patchValue(false);
    // this.isEditableNew = true;

  }

  // On click of correct button in table (after click on edit) this method will call
  SaveVO(VOFormElement, i) {
    // alert('SaveVO')
    VOFormElement.get('VORows').at(i)!.get('isEditable').patchValue(true);
  }

  // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
  CancelSVO(VOFormElement, i) {
    VOFormElement.get('VORows').at(i)!.get('isEditable').patchValue(true);
  }

  initiateVOForm(): FormGroup {
    return this.fb.group({

      number: new FormControl(234),
      name: new FormControl(''),
      description: new FormControl(''),
      positions: new FormControl(''),
      action: new FormControl('newRecord'),
      isEditable: new FormControl(false),
      isNewRow: new FormControl(true),
    });
  }
}
