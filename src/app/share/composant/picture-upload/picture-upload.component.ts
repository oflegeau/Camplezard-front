import {Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output, OnDestroy, OnChanges} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-picture-upload',
  templateUrl: './picture-upload.component.html',
  styleUrls: ['./picture-upload.component.css']
})
export class PictureUploadComponent implements OnChanges {

  @Input() image: string;
  @Input() avatar: boolean;
  @Output() output: EventEmitter<string> = new EventEmitter<string>();

  imageNew : string;
  file: any = {};
  imagePreviewUrl: any = {};
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor() {
    this.file = null;
    this.avatar = false;
    this.image = '';
  }

  /*--------------------------------------------------------------------*/
  /*                     Init                                           */
  /*--------------------------------------------------------------------*/

  ngOnChanges() {
      this.imagePreviewUrl =
          this.image !== ''
              ? this.image
              : this.avatar
              ? 'assets/img/placeholder.jpg'
              : 'assets/img/image_placeholder.jpg';
      this.handleImageChange = this.handleImageChange.bind(this);
  }

  /*--------------------------------------------------------------------*/

  handleImageChange($event) {
    $event.preventDefault();
    const reader = new FileReader();
    const file = $event.target.files[0];
    reader.onloadend = () => {
      this.file = file;
      this.imagePreviewUrl = reader.result;
   //   this.image = btoa(String.fromCharCode(...new Uint8Array(this.imagePreviewUrl)));
    };
    reader.readAsDataURL(file);
  }

  handleClick() {
    this.fileInput.nativeElement.click();
  }

  handleRemove() {
    this.file = null;
    this.imagePreviewUrl =
      this.image !== ''
        ? this.image
        : this.avatar
        ? 'assets/img/placeholder.jpg'
        : 'assets/img/image_placeholder.jpg';
    this.fileInput.nativeElement.value = null;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  imageCropped(event: ImageCroppedEvent) {
    this.imageNew = event.base64;
  }

  onOK() {
    this.output.emit(this.imageNew);
  }

  onCancel()  {
    this.output.emit('');
  }
}
