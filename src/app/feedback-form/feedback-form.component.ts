// feedback-form.component.ts
import { Component, Renderer2, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent {
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

  toggleFields() {
    this.wantToBeContacted = !this.wantToBeContacted;
  }
  
  onSubmit() {
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
  }
  
  constructor(
    private titleService: Title, 
    private metaService: Meta,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private httpClient: HttpClient) {

    this.titleService.setTitle('Feedback and Complains');

    const newLink = this.renderer.createElement('link');
    newLink.setAttribute('rel', 'icon');
    newLink.setAttribute('href', 'assets/iconBDAC.png');

    const head = this.document.head;
    const oldLink = head.querySelector('link[rel="icon"]');

    if (oldLink) {
      this.renderer.removeChild(head, oldLink);
    }

    this.renderer.appendChild(head, newLink);
  }

}
