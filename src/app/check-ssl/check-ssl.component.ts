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
  query: any = '';
  isLoad = false;
  displayedColumns: string[] = ['valid', 'domain', 'valid_from', 'valid_to', 'updatetime', 'star'];
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
      if (this.query.length > 1) {


        this.alertService.showLoading();
        let query = '';
        if (this.query.substring(this.query.length - 11, this.query.length) == '.moph.go.th') {
          query = this.query;
        } else {
          query = `${this.query}.moph.go.th`;
        }
        const rs: any = await this.service.saveData(query);
        this.alertService.hideLoading();
        if (rs.ok) {
          if (rs.data.valid) {
            this.alertService.success('SSL is Valid', query, 3000)
          } else {
            this.alertService.error('SSL is not Valid', query)
          }
          await this.getData();
        } else {
          this.alertService.error(`ไม่พบการติดตั้ง SSL certificate บน (${query}) กรุณาตรวจสอบและลองใหม่อีกครั้ง`, 'SSL Not found')
        }
      } else {
        this.alertService.error('ไม่พบ domain')
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
          i.days = moment(i.valid_to).diff(moment(), 'days');
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

  async refresh(e: any) {
    try {
      this.isLoad = true;
      this.alertService.showLoading();
      const rs: any = await this.service.updateData(e.id, e.domain);
      this.alertService.hideLoading();
      if (rs.ok) {
        if (rs.data.valid) {
          this.alertService.success('SSL is Valid')
        } else {
          this.alertService.error('SSL is not Valid')
        }
        this.getData();
      } else {
        this.alertService.error(`ไม่พบการติดตั้ง SSL certificate บน (${e.domain}) กรุณาตรวจสอบและลองใหม่อีกครั้ง`, 'SSL Not found')
      }
      this.isLoad = false;
    } catch (error) {
      this.alertService.hideLoading();
      this.isLoad = false;
      this.alertService.error(error);
    }
  }
}
