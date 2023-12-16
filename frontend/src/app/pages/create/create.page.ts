import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
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
    console.log(this.createForm)
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
        const currentDateAndTime = new Date();
        this.createForm.get('dateTime')!.setValue(currentDateAndTime);
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

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
  
      this.convertToBlob(image);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }
  
  async convertToBlob(photo: Photo) {
    if (!photo.webPath) {
      // Handle the case where webPath is undefined
      this.imagePreview = null;
      return;
    }
  
    const response = await fetch(photo.webPath);
    const blob = await response.blob();
    const file = new File([blob], "image.jpeg", { type: "image/jpeg" });
  
    this.selectedFile = file;
    this.imagePreview = photo.webPath;
  }

  deleteImage() {
    this.imagePreview = null;
    this.selectedFile = null;
  }
}
