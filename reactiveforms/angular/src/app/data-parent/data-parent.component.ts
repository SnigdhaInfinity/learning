import { Component, OnInit,Input }            from '@angular/core';
import {FormControl , Validators}             from '@angular/forms';
import {FormGroup,ReactiveFormsModule }       from '@angular/forms';
import { dataFormat }                         from '../dataformat'; 
import { DataControlService }                 from '../data-control.service';
@Component({
  selector: 'app-data-parent',
  templateUrl: './data-parent.component.html',
  styleUrls: ['./data-parent.component.css'],
  providers:[DataControlService]
})
export class DataParentComponent 
{
  @Input() inputdata: dataFormat<any>[] = [];
  forms:FormGroup;
  message="";
  msg="";
  constructor(private datacontrol:DataControlService) {
   // this.forms= this.datacontrol.checkFormParameters(this.inputdata);
 
   }
  ngOnInit()
  {
    
    this.forms= this.datacontrol.checkFormParameters(this.inputdata);
  }

  SubmitHere=function(value)
  {
    let checkelements:any[];
    let elements=[];
    let ele=[];
    //console.log("input data is : ",this.inputdata[3].controlType);

//USING THE RUN TIME CONTROL METHOD

    for(let control in this.inputdata)
    {
      if(this.inputdata[control].controlType=="checkbox")
      {
        let op=this.inputdata[control]['options'];
        //console.log("op : " ,op);
        for(let i=0;i<op.length;i++)
        {
          if(op[i].selected==true)
          {
            ele.push(op[i].key);
             //if we not add this ( . key ) then it will show 
              //     all full value of inputdata ie ( key , value and selected  value)
          }
        }
        this.forms.value[this.inputdata.key]=ele;
        //console.log(this.forms.value[this.inputdata.key]);
        let a=this.forms.value[this.inputdata.key];
        this.msg=JSON.stringify(a);
      }
    }
    
// USING THE MANUAL METHOD

    for(let i=0;i<this.inputdata[3].options.length;i++)
    {     
       if(this.inputdata[3].options[i].selected==true)
      {
        elements.push(this.inputdata[3].options[i].key);
        //if we not add this ( . key ) then it will show 
        //     all full value of inputdata ie ( key , value and selected  value)
      }
    }
    for(let sn in this.forms.value) // hell important to understand 
    {
      if(sn==this.inputdata[3].key)
      {
        this.forms.value[sn]=elements;
        this.message = JSON.stringify(this.forms.value[sn]);
      }
      else
      {
        this.message = JSON.stringify(this.forms.value);     
      }
    }
  //   this.forms.value[this.inputdata.key]=elements;
  // this.message=JSON.stringify(this.forms.value);
    }
}
