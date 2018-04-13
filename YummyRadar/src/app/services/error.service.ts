import {EventEmitter, Injectable} from '@angular/core';

import { Error } from '../models/error.model'

@Injectable()

export class ErrorService{
  errorOccurred = new EventEmitter<Error>();

  handleError(error: any){

    const errorData = new Error(error.title, error.error.message);
    this.errorOccurred.emit(errorData);
  }
}