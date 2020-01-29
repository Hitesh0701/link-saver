import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorHandlerService } from '../services/error-handler.service';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  scrollToTop() {
    // window.scroll(0, 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  convertDateToNumberFormat(d) {
    const formattedTime =
      (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) +
      '' +
      (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
    return +formattedTime;
  }

  formatDateToYYYY_MM_DD(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  timeToObject(startTime, endTime) {
    return {
      open: this.convertDateToNumberFormat(startTime),
      close: this.convertDateToNumberFormat(endTime)
    };
  }

  convertNumberToDateFormat(time_in_number) {
    const finalTime = new Date();
    const hourAndMinute = time_in_number.toString().match(/.{1,2}/g);
    finalTime.setHours(+hourAndMinute[0]);
    finalTime.setMinutes(+hourAndMinute[1]);
    return finalTime;
  }

  arrayOfStringsToArrayOfObjects(arr: any[]) {
    const newArray = [];
    arr.forEach(element => {
      newArray.push({
        label: element,
        value: element
      });
    });
    return newArray;
  }

  arrayOfObjectToArrayOfStrings(obj: []) {
    const newArray = [];
    obj.forEach(element => {
      newArray.push(element['value']);
    });
    return newArray;
  }

  stringToNumber(str: string) {
    return +str;
  }

  validateEmail(controls) {
    const regExp = new RegExp(
      // tslint:disable-next-line: max-line-length
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { validateEmail: true };
    }
  }

  validateCorporateEmail(controls) {
    // debugger;
    // tslint:disable-next-line: max-line-length
    const emailRegEx = new RegExp('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}');
    const gmailRegEx = new RegExp('[A-Z0-9a-z._%+-]+@[(?-i)gmail]+\\.[A-Za-z]{2,64}');
    const yahoo = new RegExp ('[A-Z0-9a-z._%+-]+@[(?-i)yahoo]+\\.[A-Za-z]{2,64}');
    const rediffmail = new RegExp ('[A-Z0-9a-z._%+-]+@[(?-i)rediffmail]+\\.[A-Za-z]{2,64}');
    const yopmail = new RegExp ('[A-Z0-9a-z._%+-]+@[(?-i)yopmail]+\\.[A-Za-z]{2,64}');
    const outlook = new RegExp('[A-Z0-9a-z._%+-]+@[(?-i)outlook]+\\.[A-Za-z]{2,64}');
    const hotmail = new RegExp('[A-Z0-9a-z._%+-]+@[(?-i)hotmail]+\\.[A-Za-z]{2,64}');
    // console.log('emailRegEx', emailRegEx.test(controls.value));
    // yopmail.test(controls.value) ||
    if (yopmail.test(controls.value) ||
      hotmail.test(controls.value) ||
      gmailRegEx.test(controls.value) ||
      yahoo.test(controls.value) ||
      rediffmail.test(controls.value) ||
      outlook.test(controls.value)) {
      return { validateCorporateEmail: true };
    } else {
      return null;
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any> Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  numberOnly(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && charCode !== 43 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  

  resetPage() {
    this.loader.stop();
    this.scrollToTop();
  }

  loaderStart() {
    this.loader.start();
  }

  loaderStop() {
    this.loader.stop();
  }

  routingAccordingToError(error) {
    this.errorHandler.routeAccordingToError(error);
    this.resetPage();
  }

  checkLengthOfEveryArrayInObject(obj) {
    if (obj) {
      for (const val of Object.values(obj)) {
        if (val['length'] === 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  openLinkInNewTab(link: string) {
    let url = '';
    if (!/^http[s]?:\/\//.test(link)) {
      url += 'http://';
    }

    url += link;
    window.open(url, '_blank');
  }

  toastSuccess(title, details) {
    this.toast.success(details, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      timeOut: 1500
    });
    // this.resetPage();
  }

  toastInfo(title, details) {
    this.toast.info(details, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      timeOut: 1500
    });
    this.resetPage();
  }

  toastWarning(title, details) {
    this.toast.warning(details, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      timeOut: 4000
    });
  }

  toastError(title, details) {
    this.toast.error(details, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      timeOut: 4000
    });
  }

  routeToUrl(url) {
    this.router.navigateByUrl(url);
    this.resetPage();
  }

  isObjectEmpty(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  }

  pickPartialObject(properties: string[], objectToFilter) {
    const partailObject = properties.reduce((o, k) => {
      o[k] = objectToFilter[k];
      return o;
    }, {});

    return partailObject;
  }

  // generate 4 digit randome number
  getRandomId() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  // used for creating better URS for SEO
  // Technology Strategy -> technology-strategy
  makeSlugFromTitle(s) {
    s = s.toLowerCase();
    s = s.trim ? s.trim() : s.replace(/^\s+|\s+$/g, '');
    return s.split(/\s+/).join('-');
  }
  // get browser name
  public getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }
}