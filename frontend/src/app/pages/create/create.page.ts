import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { ItemService } from 'src/app/services/item.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {
  imagePreview: string | ArrayBuffer | null = null;
  userObject: any = {};
  itemType: string = 'found';
  createForm!: FormGroup;
  inputFields: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private itemService: ItemService,
    private toastService: ToastService
  ) {
    this.initializeForm();
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.userObject = user;
      }
    });
  }

  initializeForm() {
    this.inputFields = [
      {
        label:
          this.itemType === 'found'
            ? 'Hvad har du fundet?'
            : 'Hvad har du mistet?',
        controlName: 'title',
        type: 'text',
        placeholder: 'Titel på ting',
        validators: [Validators.required, Validators.minLength(2)],
      },
      {
        label: 'Postnummer',
        controlName: 'zipcode',
        type: 'number',
        placeholder: 'Postnummer',
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ],
      },
      {
        label: 'By',
        controlName: 'location',
        type: 'text',
        placeholder: 'By',
        validators: [Validators.required],
      },
      {
        label: 'Dato og tid',
        controlName: 'dateTime',
        type: 'dateTime',
        placeholder: '',
        validators: [Validators.required],
      },
      {
        label: 'Beskrivelse',
        controlName: 'description',
        type: 'textarea',
        placeholder: 'Beskrivelse',
        validators: [Validators.required],
      },
    ];
    this.createForm = this.formService.createForm(this.inputFields);
    const currentDateAndTime = new Date();
    this.createForm.get('dateTime')!.setValue(currentDateAndTime);
  }

  dateChanged(event: any) {
    this.createForm.get('dateTime')!.setValue(event.detail.value);
  }
  handleSegmentChange(itemType: string) {
    this.itemType = itemType;
    this.initializeForm();
  }

  onSubmit() {
    if (this.createForm.valid) {
      const formData = this.createForm.value;
      formData.uid = this.userObject.uid;
      formData.name = this.userObject.displayName;
      formData.itemType = this.itemType;

      if (this.selectedFile) {
        this.authService.uploadFile(this.selectedFile).subscribe({
          next: (imageUrl) => {
            formData.imageUrl = imageUrl;
            this.createItem(formData);
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.createItem(formData);
      }
    } else {
      this.toastService.presentErrorToast('Du mangler at udfylde felter');
    }
  }

  private createItem(formData: any) {
    this.itemService.createItem(formData).subscribe({
      next: () => {
        this.toastService.presentSuccessToast('Dit opslag er blevet oprettet!');
        this.createForm.reset();
        this.imagePreview = null;
        this.selectedFile = null;
      },
      error: (err: any) => {
        this.toastService.presentErrorToast(
          'Hov der skete en fejl i oprettelsen, prøv igen!'
        );
      },
    });
  }

  triggerFileInput() {
    document.getElementById('myFileInput')!.click();
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];

      // Read the file and generate a preview
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
