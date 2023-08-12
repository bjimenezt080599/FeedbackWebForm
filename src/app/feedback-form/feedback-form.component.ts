// feedback-form.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})



export class FeedbackFormComponent {

  //Variables
  contactName: string = '';
  contactLastName: string = '';
  contactEmail: string = '';
  contactPhoneNumber: string = '';
  feedbackType: string = '';
  source: string = '';
  feedbackCategory: string = '';
  feedbackSubCategory: string = '';
  dateReceived: string = '';
  text: string = '';
  notes: string = '';
  wantToBeContacted: boolean = false;
  isFeedbackTypeEmpty = false;
  isSourceEmpty = false;
  isFeedbackCategoryEmpty = false;
  isFeedbackSubCategoryEmpty = false;
  isDateReceivedEmpty = false;
  isTextEmpty = false;
  isNotesEmpty = false;
  isContactNameEmpty = false;
  isContactLastNameEmpty = false;
  isContactEmailEmpty = false;
  isContactPhoneNumberEmpty = false;


  //Method to activate and deactivate the "Contact" fields
  toggleFields() {
    this.wantToBeContacted = !this.wantToBeContacted;

  }

  onSubmit() {

    if (!this.feedbackType) {
      this.isFeedbackTypeEmpty = true;
    }else {
      this.isFeedbackTypeEmpty = false;
    }
    if (!this.source) {
      this.isSourceEmpty = true;
    }else {
      this.isSourceEmpty = false;
    }
    if (!this.feedbackCategory) {
      this.isFeedbackCategoryEmpty = true;
    }else {
      this.isFeedbackCategoryEmpty = false;
    }
    if (!this.feedbackSubCategory) {
      this.isFeedbackSubCategoryEmpty = true;
    }else {
      this.isFeedbackSubCategoryEmpty = false;
    }
    if (!this.dateReceived) {
      this.isDateReceivedEmpty = true;
    }else {
      this.isDateReceivedEmpty = false;
    }
    if (!this.text) {
      this.isTextEmpty = true;
    }else {
      this.isTextEmpty = false;
    }
    if (!this.notes) {
      this.isNotesEmpty = true;
    }else {
      this.isNotesEmpty = false;
    }
    if (this.wantToBeContacted) {
      if (!this.contactName) {
        this.isContactNameEmpty = true;
      } else {
        this.isContactNameEmpty = false;
      }
      if (!this.contactLastName) {
        this.isContactLastNameEmpty = true;
      } else {
        this.isContactLastNameEmpty = false;
      }
      if (!this.contactEmail) {
        this.isContactEmailEmpty = true;
      } else {
        this.isContactEmailEmpty = false;
      }
      if (!this.contactPhoneNumber) {
        this.isContactPhoneNumberEmpty = true;
      } else {
        this.isContactPhoneNumberEmpty = false;
      }
    }

    if (
      !this.isFeedbackTypeEmpty && 
      !this.isSourceEmpty && 
      !this.isFeedbackCategoryEmpty && 
      !this.isFeedbackSubCategoryEmpty && 
      !this.isDateReceivedEmpty && 
      !this.isTextEmpty && 
      !this.isNotesEmpty &&
      (!this.wantToBeContacted ||
        (!this.isContactNameEmpty &&
          !this.isContactLastNameEmpty &&
          !this.isContactEmailEmpty &&
          !this.isContactPhoneNumberEmpty))
      ) {
      // Build the mutation to send the data to the GraphQL API
    const mutation = `mutation feedbackMutation {
      feedbackExternalCreate(detail: {
        feedbackType: "${this.feedbackType}",
        source: "${this.source}",
        feedbackCategory: "${this.feedbackCategory}",
        feedbackSubCategory: "${this.feedbackSubCategory}",
        dateReceived: "${this.dateReceived}",
        text: "${this.text}",
        notes: "${this.notes}. Consumer want to be contacted?: ${this.wantToBeContacted}. Contact information: Name: ${this.contactName}, Last name: ${this.contactLastName}, Email: ${this.contactEmail}, Phone Number: ${this.contactPhoneNumber}"
      })}`;
    console.log(mutation);
    // Make the GraphQL API call using HttpClient
    this.httpClient.post('https://housing.logiqc.com.au/graphql', { query: mutation }, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJUb2tlbklkIjoiM2QwM2NkMDYtMGRlZS00MjdjLWIzZDQtYjAyMzAwYzdiOWI3IiwiVXNlck5hbWUiOiJTeXN0ZW0iLCJEYXRlQ3JlYXRlZCI6IjIwMjMtMDYtMTZUMTI6MDc6MTAuNjg1NzEwNisxMDowMCIsIklzQXBpS2V5Ijp0cnVlLCJJc1NzbyI6ZmFsc2V9.w51Z5HxGMQo92N9z7Etc4kR_J8gsJ0CTSNe39nEzwbY',
        'Content-Type': 'application/json'
      }
    }).subscribe((response: any) => {
      console.log('Respuesta de la API:', response);
    });

    alert("Feedback sent");

    }

    
  }

  constructor(private httpClient: HttpClient) { 
     // Obtener la fecha y hora local actual
    const currentDate = new Date();
    
    // Obtener el desplazamiento de la zona horaria en minutos
    const timeZoneOffset = currentDate.getTimezoneOffset();
    
    // Ajustar la fecha y hora local al formato compatible con el input datetime-local
    const adjustedDate = new Date(currentDate.getTime() - timeZoneOffset * 60000);
    const formattedDate = adjustedDate.toISOString().slice(0, 16);
    
    // Establecer el valor inicial del campo de fecha
    this.dateReceived = formattedDate;
  }

}
