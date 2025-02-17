import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { AnnouncementGetParameters } from 'src/app/shared/models/announcement-get-parameters.model';
import { Announcement } from 'src/app/shared/models/announcement.model';
import { CharbonGetParameters } from 'src/app/shared/models/charbon-get-parameters.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  title = 'PLSres';
  charbonList!: Charbon[];
  exerciseList!: Exercise[];
  lastAnnouncement!: Announcement;

  constructor(
    private charbonService: CharbonService,
    private announcementService: AnnouncementService
  ) {
    this.charbonList = [];
  }

  ngOnInit(): void {
    const charbonParams: CharbonGetParameters = {
      minDate: new Date(),
      limit: 3,
      sort: 'dateAsc',
    };
    this.charbonService.getCharbonList(charbonParams).subscribe((charbons) => {
      this.charbonList = charbons;
    });

    const announcementParams: AnnouncementGetParameters = {
      limit: 1,
      sort: 'dateDesc',
    };
    this.announcementService
      .getAnnouncements(announcementParams)
      .subscribe((announcements) => {
        this.lastAnnouncement = announcements[0];
      });
  }

  openDiscordLink() {
    window.open('https://discord.com', '_blank');
  }
}
