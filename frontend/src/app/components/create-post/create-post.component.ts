import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { errorMessages } from 'src/app/constants/errorMessages';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { ItemService } from 'src/app/services/item.service';
import { ToastService } from 'src/app/services/toast.service';
import { ErrorMessages } from 'src/app/types/errorMessageType';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  @Input() editData: any = null;
  @Input() itemType: string = 'found';
  formErrorMessages: ErrorMessages = errorMessages;
  imagePreview: string | ArrayBuffer | null = null;
  userObject: any = {};
  createForm!: FormGroup;
  inputFields: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private itemService: ItemService,
    private toastService: ToastService,
    private modalController: ModalController
  ) {
    this.initializeForm();
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.userObject = user;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemType'] || changes['editData']) {
      this.initializeForm();
      if (this.editData) {
        this.preFillForm(this.editData);
      }
    }
  }

  preFillForm(data: any) {
    this.createForm.patchValue(data);
    this.createForm.get('city')?.setValue(data.location);
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
        controlName: 'city',
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
            if (this.editData) {
              formData.id = this.editData.id;
              this.updateItem(formData);
            } else {
              this.createItem(formData);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        if (this.editData) {
          formData.id = this.editData.id;
          this.updateItem(formData);
        } else {
          this.createItem(formData);
        }
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

  private updateItem(formData: any) {
    this.itemService.updateItem(this.editData.id, formData).subscribe({
      next: () => {
        this.toastService.presentSuccessToast('Dit opslag er blevet redigeret');
        this.createForm.reset();
        this.modalController.dismiss({'dismissed': true});
      },
      error: (err: any) => {
        console.log(err);
        this.toastService.presentErrorToast('Der skete en fejl, prøv igen!');
      },
    });
  }

  getErrorMessage(controlName: string): string {
    const controlErrors = this.createForm.get(controlName)?.errors;
    if (controlErrors) {
      const errorKey = Object.keys(controlErrors)[0];
      const controlErrorMessages = this.formErrorMessages[controlName];

      if (controlErrorMessages) {
        const errorMessageObj = controlErrorMessages.find(
          (msg) => msg.type === errorKey
        );
        return errorMessageObj ? errorMessageObj.message : '';
      }
    }
    return '';
  }

  triggerFileInput() {
    document.getElementById('myFileInput')!.click();
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imagePreview = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      this.convertToBlob(image);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  async convertToBlob(photo: Photo) {
    if (!photo.webPath) {
      this.imagePreview = null;
      return;
    }

    const response = await fetch(photo.webPath);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpeg', { type: 'image/jpeg' });

    this.selectedFile = file;
    this.imagePreview = photo.webPath;
  }

  deleteImage() {
    this.imagePreview = null;
    this.selectedFile = null;
  }
}
