import { Component, OnInit } from '@angular/core';
import { HeroSectionService } from '../../../../services/hero-section.service';
import { IHeroSection } from '../../../../interfaces/hero-section.interface';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent implements OnInit {
  heroSection!: IHeroSection;

  constructor(private heroSectionService: HeroSectionService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.heroSectionService.getHeroSection().subscribe((data) => {
      this.heroSection = data;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      const file = input.files[0];

      const reader = new FileReader();

      reader.onload = () => {
        this.heroSection.heroSectionImageDTOs.push({
          id: 0,
          isMain: this.heroSection.heroSectionImageDTOs.length == 0,
          linkUrl: reader.result as string,
          imageUrl: reader.result as string,
          imageFile: file,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onImageChange(event: Event, itemID: number): void {
    const input = event.target as HTMLInputElement;
    const imageItem = this.heroSection.heroSectionImageDTOs.find(
      (hs) => hs.id == itemID
    );

    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        imageItem!.imageUrl = reader.result as string;
        imageItem!.imageFile = file;
      };

      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    this.heroSection.id ? this.updateHeroSection() : this.insertHeroSection();
  }

  insertHeroSection() {
    this.heroSectionService
      .insertHeroSection(this.heroSection)
      .subscribe(() => {
        this.loadData();
      });
  }

  updateHeroSection() {
    this.heroSectionService
      .updateHeroSection(this.heroSection)
      .subscribe(() => {
        this.loadData();
      });
  }
}
