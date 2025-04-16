import { Component, OnInit } from '@angular/core';
import { HeroSectionService } from '../../../../../admin/services/hero-section.service';
import { IHeroSection } from '../../../../../admin/interfaces/hero-section.interface';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  standalone:false,
})
export class HeroSectionComponent implements OnInit {
  heroSection: IHeroSection | undefined;

  constructor(private heroSectionService: HeroSectionService) {}

  ngOnInit() {
    this.getHeroSection();
  }


 

  private getHeroSection() {
    this.heroSectionService
      .getHeroSection()
      .subscribe((section: IHeroSection) => {
        this.heroSection = section;
      });
  }
}
