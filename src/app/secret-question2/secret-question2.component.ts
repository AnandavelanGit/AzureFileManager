import { Component, OnInit } from '@angular/core';
import { FilemanagerserviceService } from '../Services/filemanagerservice.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { qaclass } from '../Models/ifile-data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secret-question2',
  templateUrl: './secret-question2.component.html',
  styleUrls: ['./secret-question2.component.css']
})
export class SecretQuestion2Component implements OnInit {

  questions: qaclass[] = [];
  azureQuestionarray: any[] = [];
  iswronganswer: boolean = false;
  qaForm: FormGroup;

  constructor(private Service: FilemanagerserviceService, private formBuilder: FormBuilder, 
    private router: Router, private service: FilemanagerserviceService
  ) {
    console.log("inside SecretQues2 constructor");

    this.qaForm = this.formBuilder.group({
      answers: this.formBuilder.array([]),
    });
  }

  get answers(): FormArray {
    return this.qaForm.get("answers") as FormArray
  }

  newAnswer(): FormGroup {
    return this.formBuilder.group({ answer: "" });
  }

  ngOnInit(): void {
    console.log("inside SecretQues2 oninit");
    console.log(this.service.loggedURLViaBrowser.split('/'));
    this.getQuestions();
  }

  onSubmit() {
    let isAllAnswersCorrect: boolean;
    let answersarray: any[] = [];
    answersarray = [...this.qaForm.value.answers];
    answersarray.forEach((ans: { answer: string }) => {
      let i: number = answersarray.indexOf(ans);
      this.questions[i].answer = ans.answer;
    });
    console.log(this.questions);
    this.Service.CheckAnswers(this.questions).subscribe((response: any) => {
      console.log("inside CheckAnswers subscriber");
      isAllAnswersCorrect = response;
      console.log(isAllAnswersCorrect);
      if (isAllAnswersCorrect)
      {
        sessionStorage.setItem('secretAnswers', 'done');
        
        this.router.navigate(this.service.loggedURLViaBrowser.split('/'));     

        //this.router.navigate(['/FileManagerRoot']);
      }
      else
        this.iswronganswer = !isAllAnswersCorrect;
      
    });

  }


  insertFormcontrols() {

    this.questions.forEach((item: any) => {

      this.answers.push(this.newAnswer());
    })

    //console.log(this.answers);
  }

  getQuestions() {

    //console.log("inside SecretQues2 getQuestions");
    this.Service.GetAllSecretQuestions().subscribe(
      (response: any) => {

        // console.log("inside allquestion" );
        // console.log(response);
        this.azureQuestionarray = [...response];
        //console.log(this.azureQuestionarray);
        this.azureQuestionarray.forEach((item: any) => {
          this.questions.push({ question: item.question, answer: '' });
        });
        this.insertFormcontrols();

      });


  }


}

