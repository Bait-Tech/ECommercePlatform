import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IHeroSection } from '../interfaces/hero-section.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroSectionService {
  private apiUrl = `${environment.apiUrl}/HeroSection`;
  constructor(private http: HttpClient) {}

  getHeroSection(): Observable<IHeroSection> {
    return this.http.get<IHeroSection>(`${this.apiUrl}`);
  }

  insertHeroSection(heroSection: IHeroSection): Observable<any> {
    const formData = this.createFormData(heroSection);
    return this.http.post(`${this.apiUrl}`, formData);
  }

  updateHeroSection(heroSection: IHeroSection): Observable<any> {
    const formData = this.createFormData(heroSection);
    return this.http.put(`${this.apiUrl}`, formData);
  }

  private createFormData(heroSection: IHeroSection): FormData {
    const formData = new FormData();

    formData.append('ID', heroSection.id.toString());
    formData.append(
      'DisplayOrder',
      heroSection.displayOrder?.toString() || '0'
    );

    heroSection.heroSectionImageDTOs.forEach((image, index) => {
      console.log(`Processing image ${index}:`, image);

      formData.append(
        `HeroSectionImageDTOs[${index}].IsMain`,
        image.isMain.toString()
      );
      formData.append(`HeroSectionImageDTOs[${index}].LinkUrl`, image.linkUrl);
      formData.append(
        `HeroSectionImageDTOs[${index}].ImageUrl`,
        image.imageUrl
      );

      if (image.imageFile) {
        formData.append(
          `HeroSectionImageDTOs[${index}].ImageFile`,
          image.imageFile,
          image.imageFile.name
        );
      }
    });

    return formData;
  }
}
