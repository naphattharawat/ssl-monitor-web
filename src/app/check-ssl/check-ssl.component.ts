import { AlertService } from './../alert.service';
import { ServiceService } from './../service.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-check-ssl',
  templateUrl: './check-ssl.component.html',
  styleUrls: ['./check-ssl.component.css']
})
export class CheckSslComponent implements OnInit {

  dataSource: any = [];
  query: any;
  isLoad = false;
  displayedColumns: string[] = ['valid','domain', 'valid_from', 'valid_to', 'updatetime', 'star'];
  constructor(
    private service: ServiceService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  onKey(e: any) {
    if (e.keyCode == 13) {
      this.search();
    }
  }

  async search() {
    try {
      this.isLoad = true;
      this.alertService.showLoading();
      const rs: any = await this.service.saveData(this.query);
      this.alertService.hideLoading();
      if (rs.ok) {
        if(rs.data.valid){
          this.alertService.success('SSL is Valid')
        } else{
          this.alertService.error('SSL is not Valid')
        }
        this.getData();
      } else {
        this.alertService.error( 'ไม่พบการติดตั้ง SSL certificate บน : กรุณาตรวจสอบและลองใหม่อีกครั้ง','SSL Not found')
      }
      this.isLoad = false;
    } catch (error) {
      this.alertService.hideLoading();
      this.isLoad = false;
      this.alertService.error(error);
    }
  }

  async getData() {
    try {
      const rs: any = await this.service.getData()
      if (rs.ok) {
        for (const i of rs.rows) {
          i.days = moment(i.valid_to).diff(moment(i.valid_from), 'days');
          i.valid_from = moment(i.valid_from).format('DD-MM-YYYY')
          i.valid_to = moment(i.valid_to).format('DD-MM-YYYY')
          i.updated_date = moment(i.updated_date).format('DD-MM-YYYY HH:mm:ss')
        }
        this.dataSource = rs.rows;
      } else {

      }
    } catch (error) {

    }
  }

  async refresh(e:any) {
    try {
      this.isLoad = true;
      this.alertService.showLoading();
      const rs: any = await this.service.updateData(e.id, e.domain);
      this.alertService.hideLoading();
      if (rs.ok) {
        if(rs.data.valid){
          this.alertService.success('SSL is Valid')
        } else{
          this.alertService.error('SSL is not Valid')
        }
        this.getData();
      } else {
        this.alertService.error( 'ไม่พบการติดตั้ง SSL certificate บน : กรุณาตรวจสอบและลองใหม่อีกครั้ง','SSL Not found')
      }
      this.isLoad = false;
    } catch (error) {
      this.alertService.hideLoading();
      this.isLoad = false;
      this.alertService.error(error);
    }
  }
}
