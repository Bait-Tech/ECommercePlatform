using ECommercePlatform.Server.Data;
using ECommercePlatform.Server.DTOs.HomePageSections;
using ECommercePlatform.Server.Entities.HomeSections;
using ECommercePlatform.Server.Helpers.ImageHelper;
using ECommercePlatform.Server.Services.Cashe;
using Microsoft.EntityFrameworkCore;

namespace ECommercePlatform.Server.Services.HomePageCustomize.Hero
{
    public class HeroSectionService : IHeroSectionService
    {
        private readonly ApplicationDBContext _DBContext;
        private readonly ImageHelperService _imageHelper;
        private readonly ICasheService _casheService;

        public HeroSectionService(ApplicationDBContext dBContext, ImageHelperService imageHelper , ICasheService casheService)
        {
            _DBContext = dBContext;
            _imageHelper = imageHelper;
            _casheService = casheService;
        }

        public async Task<HeroSectionDTO> Get()
        {
            var casheData = _casheService.GetData<HeroSectionDTO>("HeroSection");

            if (casheData != null) {
                return casheData;
            }

            var heroSection = await _DBContext.HeroSections
                .Include(hs => hs.Images)
                .FirstOrDefaultAsync();

            if (heroSection == null)
            {
                return new HeroSectionDTO();
            }

            var result = new HeroSectionDTO
            {
                ID = heroSection.ID,
                DisplayOrder = heroSection.DisplayOrder,
                HeroSectionImageDTOs = heroSection.Images.Select(i => new HeroSectionImageDTO
                {
                    ID = i.ID,
                    ImageUrl = i.ImageUrl,
                    IsMain = i.IsMain,
                    LinkUrl = i.LinkUrl
                }).ToList()
            };

            var expiryTime = DateTimeOffset.Now.AddSeconds(30);
            _casheService.SetData("HeroSection", result, expiryTime);

            return result;
        }

        public async Task<int> Insert(HeroSectionDTO model)
        {
            var heroSection = new HeroSection
            {
                DisplayOrder = model.DisplayOrder ?? 1,
            };

            await _DBContext.AddAsync(heroSection);
            await _DBContext.SaveChangesAsync(); 

            var sectionImages = new List<HeroImage>();

            foreach (var image in model.HeroSectionImageDTOs)
            {
                if (image.ImageFile != null)
                {
                    image.ImageUrl = await _imageHelper.AddImage(image.ImageFile, "heroSection");
                }

                sectionImages.Add(new HeroImage
                {
                    HeroSectionID = heroSection.ID,
                    ImageUrl = image.ImageUrl,
                    IsMain = image.IsMain,
                    LinkUrl = image.LinkUrl
                });
            }

            await _DBContext.AddRangeAsync(sectionImages);

            await _DBContext.SaveChangesAsync();

            return heroSection.ID;
        }


        public async Task<int> Update(HeroSectionDTO model)
        {
            var section = await _DBContext.HeroSections
                .Where(hs => hs.ID == model.ID)
                .FirstOrDefaultAsync();

            if (section == null)
            {
                return 0;
            }

            var existSectionImages = await _DBContext.HeroImages
                .Where(hi => hi.HeroSectionID == model.ID)
                .ToListAsync();


            foreach (var imageURL in existSectionImages.Select(esi => esi.ImageUrl))
            {
                await _imageHelper.DeleteImage(imageURL);
            }

            _DBContext.RemoveRange(existSectionImages);

            await _DBContext.SaveChangesAsync();

            var updatedImages = new List<HeroImage>();

            foreach (var image in model.HeroSectionImageDTOs)
            {
                if (image.ImageFile != null)
                {
                    image.ImageUrl = await _imageHelper.AddImage(image.ImageFile, "heroSection");
                }

                updatedImages.Add(new HeroImage
                {
                    HeroSectionID = model.ID,
                    ImageUrl = image.ImageUrl,
                    IsMain = image.IsMain,
                    LinkUrl = image.LinkUrl
                });
            }

            await _DBContext.AddRangeAsync(updatedImages);
            await _DBContext.SaveChangesAsync();

            return section.ID;
        }
    }
}