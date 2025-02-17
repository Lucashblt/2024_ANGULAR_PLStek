import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement.model';
import { Observable, map } from 'rxjs';
import { AnnouncementGetParameters } from '../models/announcement-get-parameters.model';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private http: HttpClient) {}

  private setParam(params: HttpParams, name: string, value: any): HttpParams {
    if (name && value) {
      params = params.set(name, value.toString());
    }
    return params;
  }

  
  processHttpResponses(response: Observable<any>): Observable<Announcement[]> {
    return response.pipe(
      map((announcements: any[]) =>
        announcements.map(
          (announcement: any) =>
            new Announcement(
              Number(announcement.id),
              String(announcement.title),
              String(announcement.content),
              new Date(announcement.date)
            )
        )
      )
    );
  }

  getAnnouncements(options: AnnouncementGetParameters = {}): Observable<Announcement[]> {
    let params = new HttpParams();

    params = this.setParam(params, 'limit', options.limit);
    params = this.setParam(params, 'offset', options.offset);
    params = this.setParam(params, 'sort', options.sort);


    return this.http
      .get<any>('http://localhost/PLSres/api/announcements', {params})
      .pipe(this.processHttpResponses);
  }
}
