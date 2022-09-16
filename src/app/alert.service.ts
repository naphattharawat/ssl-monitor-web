import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  error(text: any = 'เกิดข้อผิดพลาด', title: any = '', timer = null) {

    const option: any = {
      title: title,
      text: text,
      icon: 'error',
      type: 'error',
      confirmButtonText: 'ตกลง'
    };
    if (timer) {
      option.timer = timer;
    }
    Swal.fire(option);

  }

  // info(text: any) {

  //   const option: SweetAlertOptions = {
  //     text: text,
  //     type: 'info',
  //     confirmButtonText: 'ตกลง'
  //   };
  //   swal.fire(option);

  // }
  success(title = 'ดำเนินการเสร็จเรียบร้อย', text = '', timer = 2000) {

    const option: any = {
      title: title,
      text: text,
      timer: timer,
      icon: 'success',
      confirmButtonText: 'ตกลง'
    };
    Swal.fire(option)
      .then(
        function () { },
        // handling the promise rejection
        function (dismiss) {
          if (dismiss === 'timer') { }
        }
      )
  }

  // serverError() {

  //   const option: SweetAlertOptions = {
  //     title: 'เกิดข้อผิดพลาด',
  //     text: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
  //     type: 'error',
  //     confirmButtonText: 'ตกลง'
  //   };
  //   swal.fire(option);

  // }
  // async confirm(text = 'คุณต้องการดำเนินการนี้ ใช่หรือไม่?',) {
  //   const option: SweetAlertOptions = {
  //     title: '',
  //     text: text,
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'ใช่, ดำเนินการ!',
  //     cancelButtonText: 'ยกเลิก',
  //   };

  //   let result = await swal.fire(option);
  //   if (result.dismiss) return false;
  //   if (result.value) return true;

  //   return false;
  // }

  hideLoading() {
    Swal.close();
  }
  async showLoading() {
    let timerInterval
    Swal.fire({
      title: 'Please Wait !',
      html: 'loading',// add html attribute if you want or remove
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    // Swal.fire({
    //   title: 'Auto close alert!',
    //   html: 'I will close in <b></b> milliseconds.',
    //   timer: 2000,
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading()
    //     const b = Swal.getHtmlContainer().querySelector('b')
    //     timerInterval = setInterval(() => {
    //       b.textContent = Swal.getTimerLeft()
    //     }, 100)
    //   },
    //   willClose: () => {
    //     clearInterval(timerInterval)
    //   }
    // }).then((result) => {
    //   /* Read more about handling dismissals below */
    //   if (result.dismiss === Swal.DismissReason.timer) {
    //     console.log('I was closed by the timer')
    //   }
    // })
  }

}