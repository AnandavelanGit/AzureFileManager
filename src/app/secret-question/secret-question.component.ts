import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-secret-question',
  templateUrl: './secret-question.component.html',
  styleUrls: ['./secret-question.component.css']
})
export class SecretQuestionComponent {

  answers : any [] = [];

  constructor() {
    console.log("inside Secret Question component");

  }

  ngOnInit(): void {


  }

  public form = {
    familysong: '',
    place: ''
    // fullname: '',
    // username: '',
    // email: '',
    // password: '',
    // confirmPassword: '',
    // acceptTerms: false,
  };

  onSubmit(): void {
    //console.log(JSON.stringify(this.form, null, 2));
    this.answers.push({QuestionID:1, answer:this.form.familysong})
    this.answers.push({QuestionID:2, answer:this.form.place})

    console.log(this.answers);
  }

  onReset(form: NgForm): void {
    form.reset();
  }

}
